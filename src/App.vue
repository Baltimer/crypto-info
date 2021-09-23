<template>
  <div v-if="!loading" class="h-full w-full p-5 text-white grid-wrapper">
    <div class="flex flex-col justify-center items-center min-w-min text-3xl wide w-100">
      <h3>Welcome</h3>
      <p>Today's ratios</p>
      <p class="mt-5">{{actualTime}}</p>
    </div>
    <div v-for="coin in coinInfo" :key="coin.name" class="flex min-w-min w-100 border border-white rounded-lg border-opacity-30 shadow-md p-2" :class="coin.space">
      <div class="flex justify-between w-full px-2 text-xl">
        <span>{{coin.name}}</span>
        <span>{{Intl.NumberFormat("es-ES", {minimumFractionDigits: coin.decimals}).format((((coin.coin.usd + Number.EPSILON)*100)/100))}} USD</span>
      </div>
    </div>
  </div>
  <div v-else class="h-full w-full flex justify-center items-center text-white text-3xl">Loading ...</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted} from 'vue'
import axios from 'axios'
import CoinInfo from './models/CoinInfo'

export default defineComponent({
  name: 'App',
  setup() {
    const loading = ref(true)
    const coinInfo = ref(new Array<CoinInfo>())
    coinInfo.value.push(new CoinInfo("Cardano", "cardano", "big"))
    coinInfo.value.push(new CoinInfo("Mini Cardano", "mini-cardano", "wide", 7))
    coinInfo.value.push(new CoinInfo("Bitcoin", "bitcoin", "wide"))
    coinInfo.value.push(new CoinInfo("Dogecoin", "dogecoin", "small"))
    coinInfo.value.push(new CoinInfo("Coinary", "coinary-token", "tall"))
    coinInfo.value.push(new CoinInfo("Ethereum", "ethereum", "big"))
    coinInfo.value.push(new CoinInfo("Axie", "axie-infinity", "tall"))
    coinInfo.value.push(new CoinInfo("SLP", "smooth-love-potion", "small"))
    coinInfo.value.push(new CoinInfo("PvU", "plant-vs-undead-token", "small"))
    coinInfo.value.push(new CoinInfo("Weyu", "weyu", "wide", 4))
    coinInfo.value.push(new CoinInfo("Dragon Warrior", "dragon-warrior", "small"))
    coinInfo.value.push(new CoinInfo("Binamon", "binamon", "small"))

    const currencies = ["usd", "btc", "bnb"]
    const actualTime = ref(new Date().toLocaleString("es-ES"))

    setInterval(refreshTime, 1000)

    function refreshTime() {
      actualTime.value = new Date().toLocaleString("es-ES")
    }
    
    function getData() {
      loading.value = true
      axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinInfo.value.map((c) => c.token).join(",")}&vs_currencies=${currencies.join(",")}`)
        .then(({data}) => {
          Array.from(Object.keys(data)).forEach((coin) => {
            let selected = coinInfo.value.filter((info) => info.token == coin)
            if(selected.length == 1){
              selected[0].coin = data[coin]
            }
          })
          loading.value = false
        })
        .catch((error) => {
          console.error(error)
        })
    }

    setInterval(getData, 30000)

    onMounted(() => {
      getData()
    })

    return {
      actualTime,
      coinInfo,
      loading
    }
  }

})
</script>

<style scoped>
  .grid-wrapper {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: 200px;
    grid-auto-flow: dense;
  }
  .grid-wrapper .wide {
    grid-column: span 2;
  }
  .grid-wrapper .tall {
    grid-row: span 2;
  }
  .grid-wrapper .big {
    grid-column: span 2;
    grid-row: span 2;
  }
</style>
