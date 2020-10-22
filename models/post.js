module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    date: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    shape: {
      type: DataTypes.STRING
    },
    duration: {
      type: DataTypes.STRING
    },
    summary: {
      type: DataTypes.TEXT
    },
    datePosted: {
      type: DataTypes.STRING
    },
  });

  Post.associate = function(models) {
    // A Post can't be created without a User due to the foreign key constraint
    Post.belongsTo(models.User);
  };

  return Post;
};
