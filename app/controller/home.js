'use strict';

const BaseController = require('./base_controller');
class HomeController extends BaseController {
  async index() {
    // const uuid = this.ctx.cookies.get('uuid', { signed: false });
    // const name = this.ctx.cookies.get('name', { signed: false });
    // const userName = this.ctx.cookies.get('userName', { signed: false });
    // const userType = this.ctx.cookies.get('userType', { signed: false });
    this.success({
      data: (await this.ctx.service.admin.getAdminList()) || {
        uuid,
        name,
        userName,
        userType
      }
    });
  }
  async deleteAdmin() {
    let res = await this.ctx.service.admin.deleteAdmin();
    this.success({ data: res });
  }
}
module.exports = HomeController;
