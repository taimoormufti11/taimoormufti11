public class PlanetPhysics {

    static class Planet {
        String name;
        double mass;      // in kg
        double radius;    // in meters

        Planet(String name, double mass, double radius) {
            this.name = name;
            this.mass = mass;
            this.radius = radius;
        }

        double calculateGravity() {
            double G = 6.67430e-11; // gravitational constant
            return (G * mass) / (radius * radius);
        }

        void displayInfo() {
            System.out.println(name + " Gravity: " + String.format("%.2f", calculateGravity()) + " m/s²");
        }
    }

    public static void main(String[] args) {
        Planet mercury = new Planet("Mercury", 3.30e23, 2.44e6);
        Planet venus = new Planet("Venus", 4.87e24, 6.05e6);
        Planet earth = new Planet("Earth", 5.97e24, 6.37e6);
        Planet mars = new Planet("Mars", 6.42e23, 3.39e6);

        mercury.displayInfo();
        venus.displayInfo();
        earth.displayInfo();
        mars.displayInfo();
    }
}
