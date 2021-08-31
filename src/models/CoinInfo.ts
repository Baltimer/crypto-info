import Coin from "./Coin"

export default class CoinInfo {
  name!: string
  token!: string
  space!: string
  coin!: Coin
  
  public constructor(name: string, token: string, space: string){
    this.name = name
    this.token = token
    this.space = space
  }
}