// @ts-nocheck

import { DataTypes, Model, ModelDefined, Op, Optional } from 'sequelize';
import { createSequelize6Instance } from '../setup/create-sequelize-instance';
import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from "bcrypt";

// if your issue is dialect specific, remove the dialects you don't need to test on.
export const testingOnDialects = new Set(['mssql', 'sqlite', 'mysql', 'mariadb', 'postgres', 'postgres-native']);

// You can delete this file if you don't want your SSCCE to be tested against Sequelize 6

// Your SSCCE goes inside this function.
export async function run() {
  // This function should be used instead of `new Sequelize()`.
  // It applies the config for your SSCCE to work on CI.
  const sequelize = createSequelize6Instance({
    logQueryParameters: true,
    benchmark: true,
    define: {
      // For less clutter in the SSCCE
      timestamps: false,
    },
  });

  // class Foo extends Model {}

  // Foo.init({
  //   name: DataTypes.TEXT,
  // }, {
  //   sequelize,
  //   modelName: 'Foo',
  // });


  // const Student = sequelize.define('Student', {
  //   // Model attributes are defined here
  //   firstName: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   lastName: {
  //     type: DataTypes.STRING
  //     // allowNull defaults to true
  //   }
  // }, {
  //   // Other model options go here
  // });

  // `sequelize.define` also returns the model


  //console.log(Student === sequelize.models.User); // true


  // class DeliveryOrder extends Model {}


  // DeliveryOrder.init({
  //   title: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   description: {
  //     type: DataTypes.STRING
  //     // allowNull defaults to true
  //   }
  // }, {
  //   // Other model options go here
  //   sequelize, // We need to pass the connection instance
  //   modelName: 'DeliveryOrder' // We need to choose the model name
  // })

  // the defined model is the class itself
  // console.log(DeliveryOrder === sequelize.models.DeliveryOrder); // true


  //  console.log(await Foo.create({ name: 'TS foo' }));
  //  console.log(await Student.create({ firstName: 'Oussama', lastName: 'GHOUAGH' }));
  //  console.log(await DeliveryOrder.create({ title: 'My order', description: 'This is my order' }));
  //  expect(await Foo.count()).to.equal(1);
  //  expect(await Student.count()).to.equal(1);

  //   interface User {

  //   }

  // You can also define modules in a functional way
  interface UserAttributes {
    id: number,
    name: string,
    username: string,
    favoriteColor: string,
    age: number;
    password: string
  }

  // const saltRounds = 10


  // You can also set multiple attributes optional at once
  type UserCreationAttributes = Optional<UserAttributes, 'id' | 'name' | 'username' | 'favoriteColor' | 'age' | 'password'>;

  const User: ModelDefined<
    UserAttributes,
    UserCreationAttributes
  > = sequelize.define("User", {
    name: DataTypes.TEXT,
    favoriteColor: {
      type: DataTypes.TEXT,
      defaultValue: 'green'
    },
    username: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('username');
        return rawValue ? rawValue.toUpperCase() : null;
      }
    },
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER
  });

  // const Student = sequelize.define('student', {
  //   username: DataTypes.STRING,
  //   password: {
  //     type: DataTypes.STRING,
  //     set(value) {
  //       // Storing passwords in plaintext in the database is terrible.
  //       // Hashing the value with an appropriate cryptographic hash function is better.
  //       this.setDataValue('password',value + 'hashing me');

  //       //this.setDataValue('password', this.username + value + 'hashing me'); is possible
  //     }
  //   }
  // });

  // const student = Student.build({ username: 'someone', password: 'NotSo§tr0ngP4$SW0RD!' });
  // console.log(student); // '7cfc84b8ea898bb72462e78b4643cfccd77e9f05678ec2ce78754147ba947acc'
  // console.log(student.getDataValue('password')); // '7cfc84b8ea898bb72462e78b4643cfccd77e9f05678ec2ce78754147ba947acc'


  // const user = User.build({ username: 'SuperUser123' });
  // console.log(user.get("username")); // 'SUPERUSER123'
  // console.log(user.getDataValue('username')); // 'SuperUser123'

  //const jane = User.build({ name: "Jane" , age: 5 });
  // console.log(jane instanceof User); // true
  // console.log("---------this is :", jane); // "Jane"
  // await jane.save();
  // console.log('Jane was saved to the database!');


  //const jane = await User.create({ name: "Dalal", age: 53, cash: 1000 });
  // Jane exists in the database now!
  // console.log(jane instanceof User); // true
  // console.log(jane); // "Jane"

  // console.log(jane.toJSON()); // This is good!
  // console.log(JSON.stringify(jane, null, 4)); // This is also good

  // Find all users
  // const users = await User.findAll();
  // console.log(users.every(user => user instanceof User)); // true
  // console.log("All users:", JSON.stringify(users, null, 2));


  // const users_2 = await User.findAll({
  //   where: {
  //     age: 34
  //   }
  // });

  // console.log("All users authorId = 2:", JSON.stringify(users_2, null, 2));


  // const users_order = await User.findAll({
  //   order: [
  //     // Will escape title and validate DESC against a list of valid direction parameters
  //     ['age', 'DESC'], ]
  // })

  // console.log("All users order by age desc :", JSON.stringify(users_order, null, 2));

  // const [user, created] = await User.findOrCreate({
  //   where: { name: 'sdepold' },
  //   defaults: {
  //     age: 3000
  //   }
  // });
  // //console.log(user.name); // 'sdepold'
  // console.log(user); // This may or may not be 'Technical Lead JavaScript'
  // console.log(created); // The boolean indicating whether this instance was just created
  // if (created) {
  //   console.log(user); // This will certainly be 'Technical Lead JavaScript'
  // }


  // const { count, rows } = await User.findAndCountAll({
  //   where: {
  //     name: {
  //       [Op.like]: 'Jane%'
  //     }
  //   },
  //   offset: 2,
  //   limit: 2
  // });
  // console.log(count);
  // console.log(rows);




  //Update
  // jane.set({
  //   name: "Ada",
  //   favoriteColor: "blue",
  //   cash: 300
  // });
  // As above, the database still has "Jane" and "green"
  // await jane.save();
  //await jane.destroy();






  //Validations

  // const User = sequelize.define("user", {
  //   username: {
  //     type: DataTypes.TEXT,
  //     allowNull: false,
  //     unique: true
  //   },
  //   hashedPassword: {
  //     type: DataTypes.STRING(64),
  //     validate: {
  //       is: /^[0-9a-f]{64}$/i
  //     }
  //   }
  // });

  // (async () => {
  //   await sequelize.sync({ force: true });
  //   // Code here
  // })();


  // Raw Query


  // const [results, metadata] = await sequelize.query("UPDATE Users SET name ='Oussama' WHERE age = 34");
  // // Results will be an empty array and metadata will contain the number of affected rows.


  // console.log("The results are -------- : ", results,metadata );


  //const { QueryTypes } = require('sequelize');
  //const users = await sequelize.query('SELECT * FROM "Users"', { type: QueryTypes.SELECT });


  // Replacement

  // const { QueryTypes } = require('sequelize');

  // const res1 = await sequelize.query(
  //   'SELECT * FROM "Users" WHERE age = ?',
  //   {
  //     replacements: [34],
  //     type: QueryTypes.SELECT
  //   }
  // );

  // console.log("The res1 are -------- : ",res1 );

  // const res2 = await sequelize.query(
  //   'SELECT * FROM "Users" WHERE age = :age',
  //   {
  //     replacements: { age: 3000 },
  //     type: QueryTypes.SELECT
  //   }
  // );

  // console.log("The res1 are -------- : ",res2 );




  // Assosiations



  // const Team = sequelize.define('Team', {
  //   name: DataTypes.STRING,
  //   level: DataTypes.INTEGER,
  // });


  // const Player = sequelize.define('Player', {
  //   firstname: DataTypes.STRING,
  //   lastname: DataTypes.STRING,
  // });


  // Toto.hasOne(Bar);
  // Bar.belongsTo(Toto);

  // Team.hasMany,(Player);
  // Player.belongsTo(Team);


  // const Movie = sequelize.define('Movie', { name: DataTypes.STRING });
  // const Actor = sequelize.define('Actor', { name: DataTypes.STRING });

  // Movie.belongsToMany(Actor, { through: 'ActorMovies' });
  // Actor.belongsToMany(Movie, { through: 'ActorMovies' });


  // This is the setup of our models for the examples below

  // You can also define modules in a functional way
  //   interface CaptainAttributes {
  //     id: number,
  //     name: string,
  //     skillLevel: number
  //   }

  //   // const saltRounds = 10


  //   // You can also set multiple attributes optional at once
    type CaptainCreationAttributes = Optional<CaptainAttributes, 'id'>;


    const Ships = sequelize.define('Ships', {
      name: DataTypes.TEXT,
      crewCapacity: DataTypes.INTEGER,
      amountOfSails: DataTypes.INTEGER
    }, { timestamps: false });

    const Captains : ModelDefined<
    CaptainAttributes,
    CaptainCreationAttributes
  > = sequelize.define('Captains', {
      name: DataTypes.TEXT,
      skillLevel: {
        type: DataTypes.INTEGER,
        validate: { min: 1, max: 10 }
      }
    }, { timestamps: false });
    Captains.Ships = Captains.hasOne(Ships);
    Ships.Captains = Ships.belongsTo(Captains);

    // await Captain.create({ name: 'Jack Sparrow', skillLevel: 7 });
    // await Captain.create({ name: 'Jack Diamond', skillLevel: 7 });
   // await Captains.create({ name: 'Oussama GHOUAGH', skillLevel: 7, Ship : { name: 'Black eyes 2', crewCapacity: 10, amountOfSails: 3 } }, { include: Captains.Ships} );


    //await Ship.create({ name: 'Black eyes', crewCapacity: 10, amountOfSails: 3 });



  //   const awesomeCaptain = await Captains.findOne({
  //     where: {
  //       name: "Oussama GHOUAGH"
  //     }
  //   });

  //   console.log('Captain:', awesomeCaptain);

  // const hisShip = await awesomeCaptain!.getShip();
  // console.log('------- Ship Name:', hisShip.name);



  const awesomeCaptain = await Captains.findOne({
    where: {
      name: "Oussama GHOUAGH"
    },
    include: Ships
  });

  //console.log('++++++++++ Name:', awesomeCaptain);

  // Now the ship comes with it
  console.log('Name:', awesomeCaptain.name);
  console.log('Skill Level:', awesomeCaptain.skillLevel);
  console.log('Ship Name:', awesomeCaptain.Ship.name);
  console.log('Amount of Sails:', awesomeCaptain.Ship.amountOfSails);




  //------- Example from stack --------- //


  // class Sports extends Model {}

  // Sports.init({
  //   name: {
  //     type: DataTypes.STRING,
  //     unique: true,
  //     allowNull: false
  //   }
  // }, { sequelize, tableName: 'sports' });

  // class Leagues extends Model {}

  // Leagues.init({
  //   name: {
  //     type: DataTypes.STRING,
  //     unique: true,
  //     allowNull: false
  //   }
  // }, { sequelize, tableName: 'leagues' });

  // Sports.Leagues = Sports.hasMany(Leagues, {foreignKey: {name: "sports_id", allowNull: false}, sourceKey: "id"});
  // Leagues.Sports = Leagues.belongsTo(Sports, {foreignKey: {name: "sports_id", allowNull: false}, targetKey: "id"});


  // await Leagues.create({name: "Champion's league 3", Sport: {name: "Soccer 3"}}, {include: Leagues.Sports});


  // You can use sinon and chai assertions directly in your SSCCE.
  const spy = sinon.spy();
  sequelize.afterBulkSync(() => spy());
  await sequelize.sync({ alter: true });
  expect(spy).to.have.been.called;

}
