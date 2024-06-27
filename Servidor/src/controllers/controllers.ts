import { Request, Response } from "express";
import Producto from "../models/producto.model";
import Partner from "../models/partner.model";

const clients: Response[] = [];

export const getSales = (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  clients.push(res);

  Producto.findAll()
    .then(productos => {
      productos.forEach(producto => {
        res.write(`event:productos\n`);
        res.write(`data:${JSON.stringify(producto)}\n\n`);
      });
    })
    .catch(error => {
      console.error(error);
    });

  Partner.findAll()
    .then(partners => {
      partners.forEach(partner => {
        res.write(`event:partners\n`);
        res.write(`data:${JSON.stringify(partner)}\n\n`);
      });
    })
    .catch(error => {
      console.error(error);
    });
};

export const postProduct = async (req: Request, res: Response) => {
  const { nombre, cantidad, precio } = req.body;

  try {
    const producto = await Producto.create({ nombre, cantidad, precio });

    for (let client of clients) {
      client.write(`event:productos\n`);
      client.write(`data:${JSON.stringify(producto)}\n\n`);
    }

    res.status(201).json({
      success: true,
      producto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Error al crear el producto',
    });
  }
};

export const postPartners = async (req: Request, res: Response) => {
  const { nombre, company, type } = req.body;

  try {
    const partner = await Partner.create({ nombre, company, type });

    for (let client of clients) {
      client.write(`event:partners\n`);
      client.write(`data:${JSON.stringify(partner)}\n\n`);
    }

    res.status(201).json({
      success: true,
      partner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Error al crear el socio',
    });
  }
};