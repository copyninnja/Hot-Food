import restaurants from "../fixtures/restaurants.json";
const restaurantWithin1km = 7;
describe("Page/Foods/foodItem layout ", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  describe("Base test", () => {
    it("displays page header", () => {
      cy.get("h2").contains("All Restaurants");
    });
  });
  describe("Filtering", () => {
    describe("By distance", () => {
      it("should display restaurants with the distance", () => {
        cy.get(".ant-radio").eq(0).find("input").click();
        cy.get(".item").should("have.length", restaurantWithin1km);
      });
    });
  });
  describe("Displaying", () => {
    describe("display restaurant", () => {
      it("should display restaurants with restaurant name", () => {
        cy.get(".item").each(($card, index) => {
          cy.wrap($card)
            .find(".itemHeader")
            .should("have.text", restaurants[index].name);
        });
      });
      it("should display restaurants with image", () => {
        cy.get(".item").each(($card, index) => {
          cy.wrap($card)
            .find(".itemImgWrapper")
            .find("img")
            .should("have.attr", "src")
            .should("include", restaurants[index].photo);
        });
      });
      it("should display restaurants with description", () => {});
    });
  });
  describe("Navigating", () => {
    it("should navigate to food page when user clicking", () => {});
    it("should navigate to checkout page when user clicking", () => {});
    it("should navigate to orders page when user clicking", () => {});
    it("should not navigate to other type users' page", () => {});
  });
  describe("Ordering", () => {
    it("should order correct food in correct restaurant", () => {});
    it("should have the corerect order displayed", () => {});
    it("should assign the correct driver", () => {});
    it("should mark order as delivered", () => {});
  });
  describe("verifying", () => {
    it("should verify restaurant with license", () => {});
    it("should approve or reject restaurant", () => {});
  });
  describe("create food menu", () => {
    it("should create dish", () => {});
    it("should update the dish selected", () => {});
  });
});
