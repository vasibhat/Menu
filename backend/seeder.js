import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import Menu from './models/menuModel.js';
import Order from './models/orderModel.js';
import Table from './models/tableModel.js';
import menuData from './data/menu.js';
import orderData from './data/order.js'; // Make sure to have your orders data here
import tableData from './data/table.js'; // Make sure to have your tables data here

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear previous data
    await Menu.deleteMany();
    await Order.deleteMany();
    await Table.deleteMany();

    // Insert Menu items and store the inserted data
    const insertedMenus = await Menu.insertMany(menuData);
    console.log('Menu data imported!'.green.inverse);

    // Insert Tables without orders
    const insertedTables = await Table.insertMany(
      tableData.map(table => ({ ...table, orders: [] }))
    );
    console.log('Table data imported!'.green.inverse);

    // Insert Orders referencing Tables and Menus
    const insertedOrders = await Order.insertMany(
        orderData.map(order => {
          const tableRef = insertedTables.find(table => table.number === order.table);
          if (!tableRef) {
            throw new Error(`Table with number ${order.table} not found.`);
          }
          
          const menuItemRefs = order.menuItems.map(item => {
            const menuItem = insertedMenus.find(menu => menu.name === item.name);
            if (!menuItem) {
              throw new Error(`MenuItem with name ${item.name} not found.`);
            }
            return { ...item, _id: menuItem._id };
          });
          
          return {
            ...order,
            table: tableRef._id, // Use _id here
            menuItems: menuItemRefs,
          };
        })
      );
    console.log('Order data imported!'.green.inverse);

    // Update Tables to include the inserted Orders
    await Promise.all(
      insertedTables.map(async (table) => {
        const tableOrders = insertedOrders.filter(order => order.table.toString() === table.id.toString());
        table.orders = tableOrders.map(order => order.id);
        await table.save();
      })
    );
    console.log('Tables updated with orders!'.green.inverse);

    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Clear data
    await Menu.deleteMany();
    await Order.deleteMany();
    await Table.deleteMany();

    console.log('Data destroyed.'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
};
