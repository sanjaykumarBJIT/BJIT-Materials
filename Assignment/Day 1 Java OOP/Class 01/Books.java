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