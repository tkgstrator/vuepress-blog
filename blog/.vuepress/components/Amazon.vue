<template>
  <div id="product" @click="openURL">
    <div id="leftCol">
      <img :src="imageURL">
    </div>
    <div id="centerCol">
      <h1 id="productTitle">{{ productName}}</h1>
      <span>価格</span>
      <span id="productPrice">{{ productPrice }}</span>
    </div>
  </div>
</template>

<script>
import ProductData from "./product.json"

export default {
  name: "Amazon",
  data() {
    return {
      imageURL: "",
      productName: "",
      productURL: "",
      productPrice: "",
      products: ProductData,
      associateId: "tkgstrator0f-22",
      baseURL: "https://www.amazon.co.jp/gp/product/",
    }
  },
  methods: {
    openURL() {
      window.open(this.productURL, "_blank")
    }
  },
  mounted: function() {
    // ランダムにプロダクトIDを選ぶ
    const product = this.products[Math.floor(Math.random() * this.products.length)]
    // 画像のURLを取得(PA APIでしか取得できない場合もあるらしい)
    this.imageURL = `https://images-na.ssl-images-amazon.com/images/P/${product["productId"]}.09.LZZZZZZZ`
    // リンクをタグ付きで作成
    this.productURL = `${this.baseURL}${product["productId"]}/?tag=${this.associateId}`
    this.productName = product["productName"]
    this.productPrice = product["productPrice"]
    console.log(product)
  }
};
</script>

<style>
#product {
  display: flex;
  margin: 0 auto;
  /* max-width: 400px; */
  max-height: 120px;
  cursor: pointer;
  padding-top: 5px;
  padding-bottom: 5px;
  border: solid 2.7px #D0D0D0;
  /* border: solid#146EB4; */
  border-radius: 10px;
  border-spacing: 1px;
}

#product #leftCol {
  /* height: 100%; */
  width: 30%;
  max-width: 200px;
}

#centerCol {
  /* max-height: 80px; */
/* margin-right: 270px; */
}

h1#productTitle {
  margin-top: initial;
  padding-top: initial;
  appearance: none;
  font-weight: 400;
  /* height: 100%; */
  font-size: 16px !important;
  border-bottom: none !important;
  text-decoration: none !important;
}

#productPrice {
  color: #B12704 !important;
  font-size: 18px;
  line-height: 24px;
}

img {
  max-width: 100%;
  max-height: 100%;
}
</style>