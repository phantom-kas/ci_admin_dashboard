import { ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import axios from "axios";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("useAuthStore", () => {
  const getRToken = ref(useLocalStorage("rtoken", ""));
  const img_root_dir = ref(useLocalStorage('img_root_dir', ""))
  const profile_img_url = ref(useLocalStorage("profile_img_url", ""));
  const img_version = ref(useLocalStorage("img_version", 0));
  const userInfo = ref<any>(useLocalStorage("authUserinfo", {} as { [key: string]: string | number }));

  const user_information = useLocalStorage("user_information", ref<any>({}));
  const getAToken = ref(useLocalStorage("atoken", ""));
  const removeAtkn = () => {
    getAToken.value = "";
  };

  function getMimeTypeFromBase64(base64: string | null) {
    if (base64 == null) return null;
    const result = /^data:(.*?);base64,/.exec(base64);
    return result ? result[1] : null;
  }


  const base64ToBlob = (base64: string, mime: string | null) => {
    // Remove the data URL prefix (if present)
    const byteString = atob(base64.split(",")[1]);
    const arrayBuffer = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      arrayBuffer[i] = byteString.charCodeAt(i);
    }
    if (mime) return new Blob([arrayBuffer], { type: mime });
  };

  const SetTokens = (Rtoken: string | null, AToken: string | null) => {
    getRToken.value = Rtoken;
    getAToken.value = AToken;
  };

  const setProfileImg = (url: string) => {
    profile_img_url.value = url;
  };

  const setUserInfo = (dt: any) => {
    if (dt.profile_img_url) {
      setProfileImg(dt.profile_img_url);
    }
    userInfo.value = {};
    if (userInfo.value) {
      Object.keys(dt).map((v) => (userInfo.value[v] = dt[v]));
    }
  };

  const updateImgVersion = () => {
    img_version.value = img_version.value + 1;
    profile_img_url.value = profile_img_url.value + "?v=" + img_version.value;
  };

  const isAdmin = () => {
    if (userInfo.value.account_type == 4) return true;
    return false;
  };

  const getRole = () => {

    return userInfo.value.account_type;
  };


  const login = async (email: string, password: string) => {
    return axios.post('/login', { email, password }, { _load: true, _showAllMessages: true }).then(res => {
      ;
      // window.alert('res.data.status');
      console.log(res)
      // window.alert(res.data.status);
      // window.alert('res.data.status');
      if (res.data.status != 'success') { return res; }
      console.log(res.data.data);
      setUserInfo({ ...res.data.data, refreshToken: undefined, accessToken: undefined });
      SetTokens(null, res.data.data.accessToken);
      return res;
    })
  }
  const router = useRouter()
  const logout = () => {

    axios.post('logout', {
      refreshToken: getRToken.value,
    }).then(res => {
      if (res.data.status != 'success') return
      SetTokens(null, null);
      axios.defaults.headers.common["Authorization"] = ''
      router.push({ name: 'login' })
    })
  }
  return {
    getRole,
    login,
    isAdmin,
    logout,
    img_version,
    updateImgVersion,
    userInfo,
    profile_img_url,
    setUserInfo,
    removeAtkn,
    getRToken,
    SetTokens,
    getAToken,
    img_root_dir,
    user_information,
    base64ToBlob,
    getMimeTypeFromBase64,
  };
});