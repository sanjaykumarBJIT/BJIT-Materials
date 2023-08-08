public class RareItem extends Item{
    //int weight;
    String name;
    public RareItem(int weight, String n){
        this.weight = weight;
        this.name = n;
    }
    public void print(){
        System.out.println("RareItems Added!\n");
    }
}