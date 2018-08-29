export function calculateCost(storage){
    const rate = storage <= 15
      ? 8
      : storage <= 100
        ? 4
        : 1;

    return rate * storage * 100;
    
}