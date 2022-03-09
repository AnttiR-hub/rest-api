import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

//luodaan schema käyttäjätietoja varten
//UserSchema luodaan käyttäen pelkästään mongoosen tekniikoita (toisin kuin schema pankkitilejä varten)
export const UserSchema = new mongoose.Schema({
    email: {type:String, unique:true, required:true},
    password: {type:String, required:true},

})


//Kryptataan luotavan käyttäjän salasana ennen tallentamista tietokantaan, jotta se ei näy plain textinä sielä
UserSchema.pre('save', async function(next) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      const hashed = await bcrypt.hash(this['password'], 10);
      this['password'] = hashed;
      return next();
    } catch (err) {
      return next(err);
    }
  });