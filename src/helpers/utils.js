import React, { Component } from "react";

export const formatPriceRange = (priceRange) => {
  const number = parseInt(priceRange, 10);
  return "$".repeat(number + 1);
};

export const prepareMenuData = (menu) => {
  let resultMenu = [];
  menu.map((item) => {
    const quantity = 0;
    resultMenu.push({ ...item, quantity });
    return false;
  });

  return resultMenu;
};

export const generateRandomIdInCollection = (collection, idKey) => {
  let randomId = 1;
  if (collection) {
    const randomNum = Math.floor(Math.random() * collection.length);
    randomId = collection[randomNum][idKey];
  }

  return randomId;
};

export const isFiltersActive = (activeFilterList) => {
  return Object.keys(activeFilterList).filter(
    (filter) => activeFilterList[filter] === true,
  ).length;
};
