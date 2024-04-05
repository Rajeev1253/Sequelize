'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      //IF WE DONOT DEFINED PRIMARY KEY IT BY DEFAULT TAKE USERMODEL + PRIMARKY KEY AS FORIEGN KEY
      this.belongsTo(User,{foreignKey:'userId',as: 'user'})
      // define association here
    }
    toJSON(){
      return{...this.get(),id:undefined,userId:undefined}
    }
  }
  Post.init(
    {
    
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    body: {
      type: DataTypes.STRING,
      allowNull:false,

    },
    

  }, {
    sequelize,
    tableName:"posts",
    modelName: 'Post',
  });
  return Post;
};