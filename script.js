// Creat a color set
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dataviz);
var colorSet = new am4core.ColorSet();

// Clone the LP_Companies multi-dimensional/nested array
const clonedData = JSON.parse(JSON.stringify(LP_Companies))

// TOP ROW: Add the total funds of duplicate fund types (e.g., all pension funds together 21,496)
const output = clonedData.reduce((accumulator, item) => {
    // Search data with matching 'type' properties
    const type = item.type,
    found = accumulator.find(element => {
        return element.type == type
    })        
    // If the types match, add their 'funds' values together
    if (found) found.funds += item.funds;
    else accumulator.push(item)
    return accumulator
}, [])

console.log('output: ', output) // 19086


// THIRD ROW: Tally instances of duplicate fund types from data LP_Companies e.g., How many Banking companies are there? (2)
let counter = {}
LP_Companies.forEach(obj => {
    let key = JSON.stringify(obj.type)
    counter[key] = (counter[key] || 0) + 1     
})
// console.log('coutner: ', counter)


// BOTTOM ROW: Add total number of funds all together (should be 79,856)
const totalFunds = output.reduce(function(acc, item) {
    return item.funds + acc
}, 0)


// RENDER: CREATE DOM NODES
const createNodes = () => { 
    // Create main body container (for everything else to append to)
    const container = document.querySelector('.container')
    container.classList.add('container')

    // Create parent container div for all rows
    const textContainer = document.createElement('div')
    textContainer.classList.add('text-container')

    // TOP ROW: Create buttons/container for fund totals (e.g. the total funds of every pension fund added together)    
    Object.entries(output).forEach(item => {
        const textFields = document.createElement('div')
        textFields.classList.add('textFieldsContainers') 
        textFields.style.borderColor = colorSet.next()
        textFields.textContent = `${item[1].type} Totals: ${item[1].funds}`
        textContainer.append(textFields)
        container.append(textContainer)
    })

    // SECOND ROW: Create buttons/container for COMPANY NAME and their 'funds' properties 
    const companyContainers = document.createElement('div')
    companyContainers.classList.add('companyContainers')  
    // Company names
    LP_Companies.forEach(item => {        
        const buttonCompany = document.createElement('button')
        buttonCompany.classList.add('buttonCompany')        
        buttonCompany.style.borderColor = colorSet.next()
        buttonCompany.textContent = `${item.name}: ${item.funds}`
        companyContainers.append(buttonCompany)        
        container.append(companyContainers)      
        console.log('companyContainers', item)  
    }) 

    // THIRD ROW: Create buttons/container for FUND TYPE buttons (Banking: 2 )
    const typeContainers = document.createElement('div')
    typeContainers.classList.add('typeContainers')
    container.append(typeContainers)    
    // Create a button for each fund type and their tallied instances
    Object.entries(counter).forEach(item => {
        const buttonType = document.createElement('button')
        buttonType.classList.add('buttonType')         
        buttonType.style.borderColor = colorSet.next();
        buttonType.textContent = `${JSON.parse(item[0])}: ${item[1]}`
        buttonType.setAttribute('onClick', `filterFundTypes('${item[0]}')`)
        typeContainers.append(buttonType)    
    })

    // FINAL ROW: fund added together (79,856)
    const buttonTotalFunds = document.createElement('button')
    buttonTotalFunds.classList.add('totalButton')  
    buttonTotalFunds.textContent = `Every fund's value added together: ${totalFunds}`
    container.append(buttonTotalFunds)
}

// Click buttons
const filterFundTypes = (item) => {
    console.log('Fund Name: ', item)    
}

// Onload
createNodes()

//.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")