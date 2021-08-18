<template>
  <form>
    <div class="form">
      <div class="group">      
        <input v-model="code" type="text" required>
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>ギフトコード</label>
        <div class="span3">
          <button href="" class="btn btn-flat" @click=sendMessage><span>応援</span></button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "GiftCode",
    methods: {
    sendMessage() {
      let url = process.env.VUE_APP_WEBHOOK_URL
      const payload = {
        blocks: [
          {
            type: "section",
            text: {
                type: "mrkdwn",
                text: this.code,
            },
          },
        ],
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify(payload)
      })
      .then((response) => {
        if (response.ok) {
          alert("ご支援ありがとうございます")
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  mounted() {
  },
  data() {
    return {
      code: ""
    }
  },
  computed: {
  }
}
</script>

<style scoped>
.group        { 
  position:relative; 
  margin-bottom:45px; 
}
input         {
  font-size:18px;
  padding:10px 10px 10px 5px;
  display:block;
  width:300px;
  border:none;
  border-bottom:1px solid #757575;
}
input:focus     { outline:none; }

/* LABEL ======================================= */
label          {
  color:#999; 
  font-size:18px;
  font-weight:normal;
  position:absolute;
  pointer-events:none;
  left:5px;
  top:10px;
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}

/* active state */
input:focus ~ label, input:valid ~ label    {
  top:-20px;
  font-size:14px;
  color:#5264AE;
}

/* BOTTOM BARS ================================= */
.bar  { position:relative; display:block; width:300px; }
.bar:before, .bar:after   {
  content:'';
  height:2px; 
  width:0;
  bottom:1px; 
  position:absolute;
  background:#5264AE; 
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}
.bar:before {
  left:50%;
}
.bar:after {
  right:50%; 
}

/* active state */
input:focus ~ .bar:before, input:focus ~ .bar:after {
  width:50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
  position:absolute;
  height:60%; 
  width:100px; 
  top:25%; 
  left:0;
  pointer-events:none;
  opacity:0.5;
}

/* active state */
input:focus ~ .highlight {
  -webkit-animation:inputHighlighter 0.3s ease;
  -moz-animation:inputHighlighter 0.3s ease;
  animation:inputHighlighter 0.3s ease;
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
  from { background:#5264AE; }
  to  { width:0; background:transparent; }
}
@-moz-keyframes inputHighlighter {
  from { background:#5264AE; }
  to  { width:0; background:transparent; }
}
@keyframes inputHighlighter {
  from { background:#5264AE; }
  to  { width:0; background:transparent; }
}

*,
*:before,
*:after {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}

html {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 62.5%;
}

.btn,
button.btn,
button.btn {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  padding: 0.5rem 2rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #212529;
  border-radius: 0.5rem;
}

button.btn-flat {
  display: block;
  width: 200px;
  height: 60px;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 20px;
  padding: 0.75rem 3rem;

  color: #fff;
  border-radius: 0;
  background: #000;
}

button.btn-flat span {
  position: relative;
}

button.btn-flat:before {
  position: absolute;
  top: 0;
  left: 0;

  width: 150%;
  height: 500%;

  content: "";
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-transform: translateX(-98%) translateY(-25%) rotate(45deg);
  transform: translateX(-98%) translateY(-25%) rotate(45deg);

  background: #00b7ee;
}

button.btn-flat:hover:before {
  -webkit-transform: translateX(-9%) translateY(-25%) rotate(45deg);
  transform: translateX(-9%) translateY(-25%) rotate(45deg);
}
</style>