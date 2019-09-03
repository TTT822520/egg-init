'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  // app.beforeStart(async () => {
  //   await app.model.sync({
  //     alter: true
  //   });
  // });
  router.get('/', controller.home.index);
  router.post('/user/login', controller.user.common.login);
  router.post('/user/register', controller.user.common.register);
  router.post('/upload', controller.home.uploadFile);
  router.get(
    '/user/get_user_addressList',
    controller.user.address.getAddressList
  );
  router.post('/user/updateAddress', controller.user.address.updateAddress);
  router.post('/user/deleteAddress', controller.user.address.deleteAddress);
  router.post('/user/addAddress', controller.user.address.addAddress);
  router.get('/user/login_out', controller.user.common.loginOut);
  router.get('/order/order_week_data', controller.order.weekCount);
  router.get('/user/get_code_img', controller.user.common.getCodeImg);
  router.get('/user/get_user_list', controller.user.common.getUserList);
  router.get('/deleteAdmin', controller.home.deleteAdmin);
  router.get('/os/get_network_io', controller.os.getNetworkIo);
  router.get('/exec', controller.home.exec);
};
