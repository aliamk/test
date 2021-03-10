
// Creat a color set
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dataviz);

var colorSet = new am4core.ColorSet();

const container = document.querySelector('.container')
container.classList.add('container')


// Tally instances of duplicate fund types from data LP_Companies e.g., How many Banking companies are there? (2)
let counter = {}
LP_Companies.forEach(obj => {
    let key = JSON.stringify(obj.type)
    counter[key] = (counter[key] || 0) + 1     
})
console.log('counterObject: ', counter)


// Add the total funds of duplicate fund types (e.g., all pension funds together 2149)
let output = LP_Companies.reduce((accumulator, item) => {
    var type = item.type,
    found = accumulator.find(element => {
        return element.type == type
    })
    if (found) found.totalFunds += item.totalFunds;
    else accumulator.push(item)
    return accumulator
}, [])
console.log('output: ', output)

// Add total number of funds all together
const totalFunds = output.reduce(function(acc, item) {
    return item.totalFunds + acc
}, 0)

console.log('totalFunds: ', totalFunds)


function createNodes() { 
    // Create containers/buttons for COMPANY NAME and their totalFunds properties 
    const companyContainers = document.createElement('div')
    companyContainers.classList.add('companyContainers')  
    // Company names
    LP_Companies.forEach((item) => {
        const buttonCompany = document.createElement('button')
        buttonCompany.classList.add('buttonCompany')        
        buttonCompany.style.borderColor = colorSet.next()
        buttonCompany.textContent = `${item.name}: ${item.totalFunds}`
        companyContainers.append(buttonCompany)        
        container.append(companyContainers)
        console.log(item)
    })
    
    // Create text containers for fund totals 
    const textContainer = document.createElement('div')
    textContainer.classList.add('text-container')
    // For each fund type in the database, add up the totals of duplicates
    Object.entries(output).forEach(value => {
        const textFields = document.createElement('div')
        textFields.classList.add('textFieldsContainers') 
        textFields.style.borderColor = colorSet.next()
        textFields.textContent = `${value[1].type} Totals: ${value[1].totalFunds}`
        textContainer.append(textFields)
        container.append(textContainer)
    })

    // Create container for FUND TYPE buttons (Banking: 2 )
    const typeContainers = document.createElement('div')
    typeContainers.classList.add('typeContainers')
    container.append(typeContainers)
    // Create a button for each database entry and insert fund type and tallied instances
    Object.entries(counter).forEach(value => {
        const buttonType = document.createElement('button')
        buttonType.classList.add('buttonType')         
        buttonType.style.borderColor = colorSet.next();
        buttonType.textContent = `${JSON.parse(value[0])}: ${value[1]}`
        buttonType.setAttribute('onClick', `filterFundTypes('${value[0]}')`)
        typeContainers.append(buttonType)    
    })

    // Every fund added together (79,856)
    const buttonTotalFunds = document.createElement('button')
    buttonTotalFunds.classList.add('totalButton')  
    buttonTotalFunds.textContent = `Every fund's value added together: ${totalFunds}`
    container.append(buttonTotalFunds)
}

// Click buttons
const filterFundTypes = (value) => {
    console.log('value: ', value)
}

// Onload
createNodes()