<template>
<div class="login">
    <h1>Авторизация</h1>
    <form class="form" method="post" @submit.prevent.stop="handleClickSubmitForm">
      <p class="field">
        <input type="text" name="login" placeholder="Логин" required v-model="login"/>
        <i class="fa fa-user"></i>
      </p>

      <p class="field">
        <input type="password" name="password" placeholder="Пароль" v-model="password" required/>
        <i class="fa fa-lock"></i>
      </p>
      <div v-if="isWrongData" class="form__wrongData">Неправильный логин или пароль!</div>
      <p class="submit"><input type="submit" @click.stop.prevent="handleClickSubmitForm" name="sent" value="Войти"></p>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router'

const router = useRouter()

const login = ref("");
const password = ref("");
const isWrongData = ref(false);

onMounted(() => {
  sessionStorage.setItem("login", "admin");
  sessionStorage.setItem("login2", "master");
  sessionStorage.setItem("password", "admin");
  sessionStorage.setItem("password2", "master");
  if(sessionStorage.getItem('isLogged') || sessionStorage.getItem('isLoggedMaster')) {
    router.replace('/main-menu')
  }
});

const handleClickSubmitForm = () => {
  const lsLogin = sessionStorage.getItem("login");
  const lsPassword = sessionStorage.getItem("password");
  const lsLogin2 = sessionStorage.getItem("login2");
  const lsPassword2 = sessionStorage.getItem("password2");
  if (login.value !== lsLogin || password.value !== lsPassword) {
    isWrongData.value = true;
    setTimeout(() => {
      isWrongData.value = false
    }, 3000)
  } else {
    sessionStorage.setItem('isLogged', `${login.value}${password.value}`)
    sessionStorage.setItem('isLoggedMaster', '')
    router.push({name: 'MainMenu'})
  }
  if((login.value !== lsLogin2 || password.value !== lsPassword2)) {
    isWrongData.value = true;
    setTimeout(() => {
      isWrongData.value = false
    }, 3000)
  } else {
    sessionStorage.setItem('isLogged', '')
    sessionStorage.setItem('isLoggedMaster', `${login.value}${password.value}`)
    router.push({name: 'MainMenu'})
  }
};
</script>

<style lang="scss" scoped>
$loginfonts: 13px/20px "Open Sans", Tahoma, Verdana, sans-serif;

$fontscolor: #a7a599;
$loginbg: #31302b;
$headerbg: #1abc9c;
$buttoncolor: #16a085;
$buttonhover: rgba(26, 188, 156, 1);
$iconhover: #27ae60;

@import "https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,300,400,700)";

body {
  font: $loginfonts;
  color: $fontscolor;
  background: $loginbg;
}

.logo {
  background-position: center;
  height: 60px;
  width: 140px;
  margin: 100px auto 30px auto;
}

.form {
  width: 100%;

  .field {
    position: relative;
    margin: 0 50px;

    i {
      font-size: 18px;
      left: 0px;
      top: 0px;
      position: absolute;
      height: 44px;
      width: 44px;
      color: #f7f3eb;
      background: #676056;
      text-align: center;
      line-height: 44px;
      transition: all 0.3s ease-out;
      pointer-events: none;
    }
  }
}

.login {
  position: relative;
  width: 370px;
  height: 315px;
  background: white;
  border-radius: 3px;
  border: 1px solid #009879;

  &:before {
    content: "";
    position: absolute;
    top: -8px;
    right: -8px;
    bottom: -8px;
    left: -8px;
    z-index: -1;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  h1 {
    line-height: 55px;
    font-size: 24px;
    font-weight: bold;
    font-family: "Open Sans", sans-serif;
    text-transform: uppercase;
    color: #fff;
    text-align: center;
    background: $headerbg;
    margin: 0;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .submit {
    text-align: center;
  }
  p {
    &:first-child {
      margin-top: 30px;
    }

    .remember {
      float: left;

      label {
        color: #a7a599;
        font-size: 12px;
        cursor: pointer;
      }
    }

    .forgot {
      float: right;
      margin-right: 50px;

      a {
        color: #a7a599;
        font-size: 12px;
        text-decoration: none;
        font-style: italic;
        transition: all 0.3s ease-out;

        &:hover {
          color: #f2672e;
        }
      }
    }
  }
}

::-webkit-input-placeholder {
  color: #ded9cf;
  font-family: "Open Sans";
}

:-moz-placeholder {
  color: #ded9cf !important;
  font-family: "Open Sans";
}

.form input[type="text"],
input[type="password"] {
  font-family: "Open Sans", Calibri, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  padding: 10px 15px 10px 55px;
  position: relative;
  width: 200px;
  height: 24px;
  color: #676056;
  border: none;
  background: #f7f3eb;
  color: #777;
  transition: color 0.3s ease-out;
}

.form input[type="text"] {
  margin-bottom: 15px;
}

.form input[type="text"]:hover ~ i,
.form input[type="password"]:hover ~ i {
  color: $iconhover;
}

.form input[type="text"]:focus ~ i,
.form input[type="password"]:focus ~ i {
  color: $iconhover;
}

.form input[type="text"]:focus,
.form input[type="password"]:focus,
.form button[type="submit"]:focus {
  outline: none;
}

.form input[type="submit"] {
  margin-top: 15px;
  width: 270px;
  text-align: center;
  font-size: 14px;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  padding: 12px 0;
  letter-spacing: 0;
  box-shadow: inset 0px 0px 0px 0px $buttonhover;

  color: #fff;
  background-color: $buttoncolor;
  text-shadow: none;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  position: relative;
  margin-bottom: 20px;
  -webkit-animation: shadowFadeOut 0.4s;
  -moz-animation: shadowFadeOut 0.4s;
}

.form input[type="submit"]:hover,
input[type="submit"]:focus {
  color: #fff;
  box-shadow: inset 0px 46px 0px 0px $buttonhover;
  -webkit-animation: shadowFade 0.4s;
  -moz-animation: shadowFade 0.4s;
}

@keyframes shadowFade {
  0% {
    box-shadow: inset 0px 0px 0px 0px $buttonhover;
    color: #fff;
  }
  100% {
    box-shadow: inset 0px 46px 0px 0px $buttonhover;
    color: #fff;
  }
}

@keyframes shadowFadeOut {
  0% {
    box-shadow: inset 0px 46px 0px 0px $buttonhover;
    color: #fff;
  }
  100% {
    box-shadow: inset 0px 0px 0px 0px $buttonhover;
    color: #fff;
  }
}

@-webkit-keyframes shadowFade {
  0% {
    box-shadow: inset 0px 0px 0px 0px $buttonhover;
    color: #fff;
  }
  100% {
    box-shadow: inset 0px 46px 0px 0px $buttonhover;
    color: #fff;
  }
}

@-webkit-keyframes shadowFadeOut {
  0% {
    box-shadow: inset 0px 46px 0px 0px $buttonhover;
    color: #fff;
  }
  100% {
    box-shadow: inset 0px 0px 0px 0px $buttonhover;
    color: #fff;
  }
}

@-moz-keyframes shadowFade {
  0% {
    box-shadow: inset 0px 0px 0px 0px $buttonhover;
    color: #fff;
  }
  100% {
    box-shadow: inset 0px 46px 0px 0px $buttonhover;
    color: #fff;
  }
}

@-moz-keyframes shadowFadeOut {
  0% {
    box-shadow: inset 0px 44px 0px 0px $buttonhover;
    color: #fff;
  }
  100% {
    box-shadow: inset 0px 0px 0px 0px $buttonhover;
    color: #fff;
  }
}

.form input[type="checkbox"] {
  display: none;
}
.form__wrongData {
  color: red;
  padding: 4px;
  border-radius: 6px;
  text-align: center;
  position: absolute;
  width: 100%;
  bottom: 94px;
}
</style>
