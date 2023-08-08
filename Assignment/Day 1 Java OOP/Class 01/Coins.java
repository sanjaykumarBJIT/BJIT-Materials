public class Coins extends Item{
    //int weight;
    int amount;
    public Coins(int weight, int amount){
        this.weight = weight;
        this.amount = amount;
    }
    public void print(){
        System.out.println("Coins Added!\n");
    }
}