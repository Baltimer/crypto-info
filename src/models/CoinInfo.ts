import Coin from "./Coin"

export default class CoinInfo {
  name!: string
  token!: string
  space!: string
  coin!: Coin
  decimals!: number
  
  public constructor(name: string, token: string, space: string, decimals: number = 2){
    this.name = name
    this.token = token
    this.space = space
    this.decimals = decimals
  }
}