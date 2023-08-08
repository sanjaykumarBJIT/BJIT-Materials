public class Mobile extends Item{
    //int weight;
    String model;
    public Mobile(int weight, String n){
        this.weight = weight;
        this.model = n;
    }
    public void print(){
        System.out.println("Mobile Added!\n");
    }
}