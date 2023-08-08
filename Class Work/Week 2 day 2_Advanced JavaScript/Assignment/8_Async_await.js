async function lagyFunction(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        data = data+data;
        resolve(data);
      }, 2000); 
    });
  }
  
  async function main() {
    try {
      const call1 = await lagyFunction(10);
      const call2 = await lagyFunction(call1);
      const call3 = await lagyFunction(call2);
      console.log(call1);
      console.log(call2);
      console.log(call3);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  main();

  
  
  
  
  