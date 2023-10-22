import {createStore} from 'vuex';
import axios from "axios";
import {Cloudinary} from "@cloudinary/url-gen";
import {CloudinaryImage} from "@cloudinary/url-gen/assets/CloudinaryImage";
import {fill} from "@cloudinary/url-gen/actions/resize";
import * as process from "process";
import {importPlugin} from "vite-plugin-vuetify/dist/importPlugin";

export default createStore({
  state: {
    loginModalState: false,
    freezeModalState: {
      target: "",
      isShow: false,
    },
    currentUser: {
      id: "",
      name: "",
      image: "",
      role: "",
    },
    toast: {
      show: false,
      message: "",
      color: "",
    },
    myAvatar: new CloudinaryImage,
  },
  getters: {
    getLoginModalState: (state) => {
      return state.loginModalState;
    },
    getCurrentUser: (state) => {
      return state.currentUser;
    },
    getToast: (state) => {
      return state.toast;
    },
    getMyAvatar: (state) => {
      return state.myAvatar;
    },
    getFreezeModalState: (state) => {
        return state.freezeModalState;
    },
  },
  mutations: {
    setLoginModalState: (state, value) => {
      state.loginModalState = value;
    },
    setFreezeModalState: (state, value) => {
      state.freezeModalState = value;
    },
    setCurrentUser: (state, value) => {
      state.currentUser = {
        id: value.id,
        name: value.name,
        image: value.image,
        role: value.role,
      }
    },
    setToast: (state, value) => {
      state.toast = {
        show: value.show,
        message: value.message,
        color: value.color
      }
    },
    setAvatar: (state, value) => {
      const cld = new Cloudinary({
        cloud: {
          cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
        },
      });

      state.myAvatar = cld.image(value);
      state.myAvatar.resize(fill().width(100).height(100));
    },
  },
  actions: {
    fetchCurrentUser: async ({commit}) => {
      const jwt = sessionStorage.getItem('jwt');

      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
        headers: {Authorization: `Bearer ${jwt}`},
      }).then((res) => {
        commit('setCurrentUser', {
          id: res.data.id,
          name: res.data.name,
          image: res.data.image,
          role: res.data.role
        });

        if(res.data.image)
          commit('setAvatar', res.data.image);

      }).catch((err) => {
        console.log(err);
      });
    },
  },
});
