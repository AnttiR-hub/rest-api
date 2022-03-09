export class BaseAccDto {
  name: string
  balance: number
}

/*
Käytetään DTO:ta (Data Transfer Object), jotta kommunikaatio eri prosessien välillä on kevyempää
Muissa tiedostoissa luodaan myös DTO:t tilin luomista ja päivittämistä varten 
sekä DTO:t käyttäjädatan käsittelyyn (rekisteröityminen, login, payload).
 */