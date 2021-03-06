'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const {
    model
  } = app;
  const {
    schema
  } = require('../schema/goods_category_attribute_relation')(
    app
  );

  let GoodsAttributeRelation = model.define('goodsAttributeRelation', schema, {
    tableName: 'goods_category_attribute_relation',
    freezeTableName: true
  });
  GoodsAttributeRelation = concatModel(GoodsAttributeRelation);
  GoodsAttributeRelation.associate = () => {
    GoodsAttributeRelation.belongsTo(model.models.goodsAttribute, {
      foreignKey: 'goods_attribute_id',
      targetKey: 'goods_attribute_id'
    });
    GoodsAttributeRelation.belongsTo(model.models.goodsAttributeCategory, {
      foreignKey: 'goods_attribute_category_id',
      targetKey: 'goods_attribute_category_id'
    });
  };
  return GoodsAttributeRelation;
};
