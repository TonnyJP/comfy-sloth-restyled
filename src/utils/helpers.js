export const formatPrice = (number) => {
    const newNumber = Intl.NumberFormat('de-DE',{
        style:'currency',
        currency: 'EUR'
    }).format(number/100);
    
    return newNumber
}

export const getUniqueValues = (all_products, type) => {
    //console.log(all_products, type)
    let allValue = all_products.map((item) =>item[type])
    if(type === 'colors'){
        allValue = allValue.flat()
    }
    return ['all', ...new Set(allValue)]
}
