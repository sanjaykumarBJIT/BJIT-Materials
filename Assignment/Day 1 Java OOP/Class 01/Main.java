public class Main {
    public static void main(String[] args) {
        Bag bag = new Bag();
        Item book = new Books(3, "Feluda");
        Item coin = new Coins(1, 15);
        Item crossBow = new Crossbow(5, 55);
        Item game = new Games(1, 2);
        Item key = new Key(1, 420);
        Item laptop = new Laptops(3, 69000);
        Item mobile = new Mobile(2, "Iphone 13");
        Item rareItem = new RareItem(1, "Necklace");

        if (bag.canAddItem(book)) {
            bag.addItem(book);
        }

        if (bag.canAddItem(coin)) {
            bag.addItem(coin);
        }

        if (bag.canAddItem(crossBow)) {
            bag.addItem(crossBow);
        }

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

