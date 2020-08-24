<template>
  <div>
    <v-container>
      <Requester />
    </v-container>
  </div>
</template>

<script>
import Requester from "@/components/Requester";
import axios from "axios";
import ErrorMessage from "@/components/ErrorMessage";
import ManyData from "@/components/ManyData";
import SingleData from "@/components/SingleData";
import GoByClick from "@/components/GoByClick";
import SocialMediaLinks from "@/components/SocialMediaLinks";
const pattern = new RegExp(
  "^(https?:\\/\\/)?" + // protocol
  "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
  "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
  "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
  "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
  "i"
); // fragment locator
export default {
  components: {
    Requester,
    ErrorMessage,
    ManyData,
    SingleData,
    GoByClick,
    SocialMediaLinks,
  },
  data() {
    return {
      screenWidth: 0,
      history: [],
      examples: [
        {
          endpoint: "https://api.github.com/users",
          status: 200,
          type: "Multiple",
          desc:
            "If the response contains many objects, it will be displated as a DataTable",
        },
        {
          endpoint: "https://api.github.com/users/canersezgin",
          status: 200,
          type: "Single",
          desc:
            "If the response is a single object, it will be displayed as a List rather than DataTable",
        },
        {
          endpoint: "https://jsonplaceholder.typicode.com/posts?_limit=8",
          status: 200,
          type: "Multiple",
          desc: "You can send a query if the endpoint supports",
        },
        {
          endpoint: "https://jsonplaceholder.typicode.com/users",
          status: 200,
          type: "Multiple",
          desc: "If the multiple data response contains object, it is ignored",
        },
      ],
      headers: [],
      body: [],
      rules: [
        (value) => (value ? !!pattern.test(value) || "Invalid URL" : true),
      ],
      form: {
        endpoint: "",
      },
      singleData: null,
      responseCode: 0,
      error: "",
    };
  },
  created() {
    this.track();
  },
  mounted() {
    this.apiRequest();
    this.screenWidth = window.innerWidth;
  },
  methods: {
    track() {
      if (window.location.hostname === "localhost") {
        console.log("Tracking", this.$route.name);
      } else {
        this.$ga.page("/");
      }
    },
    goHome() {
      this.$router.push({ name: "Home" });
      this.cleanTable();
      this.form.endpoint = "";
      this.singleData = null;
      this.responseCode = 0;
      this.error = "";
    },
    capitalize: (str) =>
      str ? str.charAt(0).toUpperCase() + str.slice(1) : "",
    isValidUrl: (url) => !!pattern.test(url),
    cleanTable() {
      this.headers = [];
      this.body = [];
    },
    createTable(keys, dataset) {
      this.cleanTable();
      if (keys.length > 0) {
        dataset.forEach((data, i) => {
          let result = {};
          if (i === 0) {
            keys.forEach((key) => {
              this.headers.push({
                text: this.capitalize(key),
                value: key,
                status: true,
              });
            });
          }
          keys.forEach((key) => {
            result[key] = data[key];
          });
          this.body.push(result);
        });
      }
    },
    goToEndpoint() {
      const endpoint = this.$route.query.endpoint;
      if (endpoint === this.form.endpoint) {
        console.log("same endpoint, dont send any request");
        return;
      }
      if (this.isValidUrl(this.form.endpoint)) {
        this.$router.push({
          name: "Home",
          query: { endpoint: this.form.endpoint },
        });
        this.apiRequest();
      }
    },
    goHistory(endpoint) {
      this.form.endpoint = endpoint;
      this.goToEndpoint();
    },
    saveHistory(data) {
      this.history.unshift(data);
      if (this.history.length > 5) {
        this.history.pop();
      }
    },
    apiRequest() {
      const endpoint = this.$route.query.endpoint;
      this.form.endpoint = endpoint;
      if (this.isValidUrl(endpoint)) {
        this.mobilePage = 1;
        let status = 0;
        axios
          .get(endpoint)
          .then((res) => {
            var data = res.data;
            if (res.data[0]) {
              const keys = Object.keys(res.data[0]);
              //keys = keys.filter(k => typeof(res.data[0][k]) !== 'object')
              this.createTable(keys, data);
              this.singleData = null;
              status = 200;
              this.error = null;
            } else if (res.data) {
              this.singleData = res.data;
              this.cleanTable();
              status = 200;
              this.error = null;
            }
            this.saveHistory({ endpoint, status });
            this.responseCode = status;
          })
          .catch((err) => {
            this.headers = [];
            this.body = [];
            this.singleData = null;
            status = err.response.status;
            this.error = err.response.data || {
              message: "There is not any Error Message",
            };
            if (
              (Object.keys(this.error).length === 0 && status === 404) ||
              typeof this.error === "string"
            ) {
              this.error = { message: "Not Found" };
            }
            this.saveHistory({ endpoint, status });
            this.responseCode = status;
          });
      } else {
        console.log("invalid url");
        this.cleanTable();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
ul > li {
  list-style-type: none;
  padding: 7px 0;
}
</style>
