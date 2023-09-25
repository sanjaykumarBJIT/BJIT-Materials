public class Main {
    public static void main(String[] args) {
        Item game = new Games(1, 2);
        Item key = new Key(1, 420);
        Item laptop = new Laptops(3, 69000);
        Item mobile = new Mobile(2, "Iphone 13");
        Item rareItem = new RareItem(1, "Necklace");


        if (bag.canAddItem(game)) {
            bag.addItem(game);
        }

        if (bag.canAddItem(key)) {
            bag.addItem(key);
        }

        if (bag.canAddItem(laptop)) {
            bag.addItem(laptop);
        }

        if (bag.canAddItem(mobile)) {
            bag.addItem(mobile);
        }

        if (bag.canAddItem(rareItem)) {
            bag.addItem(rareItem);
        }
    }
}

public class Item{
    public int weight;

    public void print(){
        System.out.println("Item added!");
    }
}

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

public class Books extends Item{
    //int weight;
    String name;
    public Books(int weight, String n){
        this.weight = weight;
        this.name = n;
    }
    public void print(){
        System.out.println("Books Added!\n");
    }
}






