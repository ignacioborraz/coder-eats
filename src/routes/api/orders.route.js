import OrdersController from "../../controllers/orders.controller.js";
import MyRouter from "../router.js";

const controller = new OrdersController();

export default class OrdersRouter extends MyRouter {
  init() {
    //PARA CREAR UNA ORDEN DE UN USUARIO
    this.create("/", ["USER", "ADMIN", "PREM"], async (req, res, next) => {
      try {
        let data = req.body;
        data.user_id = req.user._id;
        //req.user lo agrega la política de privacidad
        let response = await controller.create(data);
        if (response) {
          return res.sendSuccessCreate(response);
        } else {
          return res.sendFailed();
        }
      } catch (error) {
        next(error);
      }
    });
    //PARA LEER LAS ORDENES DE UN USUARIO
    this.read("/", ["USER", "PREM"], async (req, res, next) => {
      try {
        let user_id = req.user._id;
        //req.user lo agrega la política de privacidad
        let response = await controller.read(user_id);
        if (response) {
          return res.sendSuccess(response);
        } else {
          return res.sendNotFound("order");
        }
      } catch (error) {
        next(error);
      }
    });
    //PARA ACTUALIZAR UNA ORDEN
    this.update("/:id", ["USER", "ADMIN", "PREM"], async (req, res, next) => {
      try {
        let { id } = req.params;
        let data = req.body;
        let response = await controller.update(id, data);
        if (response) {
          return res.sendSuccess(response);
        } else {
          return res.sendNotFound("order");
        }
      } catch (error) {
        next(error);
      }
    });
    //PARA ELIMINAR UNA ORDEN
    this.destroy("/:id", ["USER", "ADMIN", "PREM"], async (req, res, next) => {
      try {
        let { id } = req.params;
        let response = await controller.destroy(id);
        if (response) {
          return res.sendSuccess(response);
        } else {
          return res.sendNotFound("order");
        }
      } catch (error) {
        next(error);
      }
    });
    //PARA COMPRAR TODAS LAS ORDENES, CREAR TICKET Y ELIMINAR LOS DOCS (DEBERIA CAMBIAR DE ESTADO)
    this.create(
      "/ticket",
      ["USER", "ADMIN", "PREM"],
      async (req, res, next) => {
        try {
          let user_id = req.user._id;
          //req.user lo agrega la política de privacidad
          let response = await controller.destroyAll(user_id);
          if (response) {
            return res.sendSuccess(response);
          } else {
            return res.sendNotFound("order");
          }
        } catch (error) {
          next(error);
        }
      }
    );
    this.read("/all", ["ADMIN"], async (req, res, next) => {
      try {
        let page = req.query.page || 1;
        let response = await controller.readAll(page);
        if (response) {
          return res.sendSuccess(response);
        } else {
          return res.sendNotFound("orders");
        }
      } catch (error) {
        next(error);
      }
    });
    this.read("/gain", ["USER", "PREM"], async (req, res, next) => {
      try {
        //let user_id = "651e1df116e1c54fe5b793c8"
        let user_id = req.user._id    //passport-politics
        let response = await controller.getGain(user_id);
        if (response) {
          return res.sendSuccess(response);
        } else {
          return res.sendNotFound("orders");
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
}
