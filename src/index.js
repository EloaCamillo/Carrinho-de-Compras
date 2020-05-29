

const data = require("./data/products.json")
const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getShoppingCart(ids, productsList) {

	const filterToId = findInputs(ids, productsList)
	const products = nameCategoryProduct(filterToId)
	const promotion = getPromotion(products)
	const totalPrice = priceTotal(filterToId, promotion)
	const discountValue = discontPrice(filterToId, promotion)
	const discount = getPercentageDiscont(filterToId, promotion) + "%"

	return {
		products,
		promotion,
		totalPrice,
		discountValue,
		discount
	};

}
function findByIdJson(id, productsList) {
	return productsList.find(product => product.id === id);
}

function findInputs(ids, productsList) {

	return ids.map(id => findByIdJson(id, productsList))
}

function nameCategoryProduct(productsListFilter) {
	return productsListFilter.map(product => ({
		name: product.name,
		category: product.category
	}))
}


function getPromotion(productsListFilter) {
	const products = []
	productsListFilter.forEach(product => {
		if (!products.includes(product.category)) {
			products.push(product.category)
		}



	});
	return promotions[products.length - 1]

}

function priceTotal(productsListFilter, promotion) {
	let totalPrice = 0;
	productsListFilter.forEach((product) => {
		let priceDescont = 0;
		for (desc of product.promotions) {
			if (desc.looks.includes(promotion)) {
				priceDescont = desc.price;
				break;
			}
			else {
				priceDescont = product.regularPrice
			}
		}
		totalPrice += priceDescont
	})
	return totalPrice.toFixed(2);

}


function regularPrice(productListFilter) {
	let price = 0;
	productListFilter.forEach((product) => {
		price += product.regularPrice
	})
	return price.toFixed(2);
}


function discontPrice(productListFilter, promotion) {


	return (regularPrice(productListFilter) - priceTotal(productListFilter, promotion)).toFixed(2)
}


function getPercentageDiscont(productListFilter, promotion) {
	const regularPrices = regularPrice(productListFilter);
	const totalDiscount = discontPrice(productListFilter, promotion);
	return Math.round(((totalDiscount * 100) / regularPrices) * 100) / 100;
}



module.exports = { getShoppingCart };
