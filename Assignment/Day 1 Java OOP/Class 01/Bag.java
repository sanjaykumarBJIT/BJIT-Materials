public class Bag{
    int currentWeight = 0, f=0;
    boolean canAddItem(Item item){
        if(currentWeight + item.weight >20){
            return false;
        }
        else{  
            return true;
        }
    }
    public void addItem(Item item)
    {
        currentWeight+=item.weight;
        item.print();
    }
}




