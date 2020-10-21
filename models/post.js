module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      },
      shape: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      datePosted: {
        type: DataTypes.DATE,
        allowNull: false,
        len: [1]
      }
    });
  
    Post.associate = function(models) {
      // A Post can't be created without a User due to the foreign key constraint
      Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Post;
  };