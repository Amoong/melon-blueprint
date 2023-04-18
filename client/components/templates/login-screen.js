import { html, DefaultComponent } from "/client/utils.js";

const template = html`
  <style>
    :host {
      width: 100%;
    }

    .login-screen {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(10px);
      background-color: rgba(0, 0, 0, 0.7);
    }

    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 40px;
      height: 40px;
      color: rgba(255, 255, 255, 0.8);
    }

    .close-btn svg {
      width: 100%;
      height: 100%;
    }

    form {
      display: flex;
      gap: 10px;
      width: 240px;
    }

    .left {
      width: 85%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    input {
      width: 100%;
      height: 32px;
      border: 0;
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 0.2);
      padding: 0 10px;
      color: white;
    }

    input:focus-visible {
      outline: none;
      background-color: rgba(255, 255, 255, 0.4);
    }

    input::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }

    .link {
      color: rgba(255, 255, 255, 0.8);
      font-size: 12px;
      align-self: flex-end;
    }

    .right {
      width: 15%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    .confirm-btn {
      width: 28px;
      height: 28px;
      color: rgba(255, 255, 255, 0.6);
      padding: 0;
      margin-bottom: 25px;
    }

    .confirm-btn svg {
      width: 100%;
      height: 100%;
    }

    h1 {
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 10px;
    }

    .hide {
      display: none;
    }
  </style>
  <div class="login-screen">
    <div class="content">
      <button class="close-btn">
        <svg
          clip-rule="evenodd"
          fill-rule="evenodd"
          stroke-linejoin="round"
          stroke-miterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
          />
        </svg>
      </button>
      <form class="login-form hide">
        <div class="left">
          <h1>로그인</h1>
          <input placeholder="아이디" name="id" type="text" />
          <input placeholder="비밀번호" name="password" type="password" />
          <button class="link to-login">회원가입 하기</button>
        </div>
        <div class="right">
          <button class="confirm-btn ">
            <svg
              clip-rule="evenodd"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path
                d="m12.007 2c-5.518 0-9.998 4.48-9.998 9.998 0 5.517 4.48 9.997 9.998 9.997s9.998-4.48 9.998-9.997c0-5.518-4.48-9.998-9.998-9.998zm1.523 6.21s1.502 1.505 3.255 3.259c.147.147.22.339.22.531s-.073.383-.22.53c-1.753 1.754-3.254 3.258-3.254 3.258-.145.145-.335.217-.526.217-.192-.001-.384-.074-.531-.221-.292-.293-.294-.766-.003-1.057l1.977-1.977h-6.693c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h6.693l-1.978-1.979c-.29-.289-.287-.762.006-1.054.147-.147.339-.221.53-.222.19 0 .38.071.524.215z"
                fill-rule="nonzero"
              />
            </svg>
          </button>
        </div>
      </form>
      <form class="signup-form">
        <div class="left">
          <h1>회원가입</h1>
          <input placeholder="아이디" name="id" type="text" />
          <input placeholder="비밀번호" name="password" type="password" />
          <button class="link to-login">로그인 하기</button>
        </div>
        <div class="right">
          <button class="confirm-btn">
            <svg
              clip-rule="evenodd"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path
                d="m12.007 2c-5.518 0-9.998 4.48-9.998 9.998 0 5.517 4.48 9.997 9.998 9.997s9.998-4.48 9.998-9.997c0-5.518-4.48-9.998-9.998-9.998zm1.523 6.21s1.502 1.505 3.255 3.259c.147.147.22.339.22.531s-.073.383-.22.53c-1.753 1.754-3.254 3.258-3.254 3.258-.145.145-.335.217-.526.217-.192-.001-.384-.074-.531-.221-.292-.293-.294-.766-.003-1.057l1.977-1.977h-6.693c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h6.693l-1.978-1.979c-.29-.289-.287-.762.006-1.054.147-.147.339-.221.53-.222.19 0 .38.071.524.215z"
                fill-rule="nonzero"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  </div>
`;

class LoginScreen extends DefaultComponent {
  constructor() {
    super(template);

    this.$loginForm = this.shadowRoot.querySelector(".login-form");
    this.$signupForm = this.shadowRoot.querySelector(".signup-form");

    this.initEvent();
  }

  initEvent = () => {
    this.$signupForm.addEventListener("submit", this.signup);
  };

  signup = async (e) => {
    e.preventDefault();

    const id = e.currentTarget.querySelector("[name=id]").value;
    const password = e.currentTarget.querySelector("[name=password]").value;

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        password,
      }),
    });
  };
}

customElements.define("login-screen", LoginScreen);
