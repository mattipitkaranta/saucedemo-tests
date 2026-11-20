# Sauce Demo test plan

Five independent Chromium scenarios for the recruitment assignment, ordered by business risk. Start each in a fresh browser context. Use the configured `standardUser` account unless specified, and use synthetic checkout details.

| Priority and scenario | Business risk | Test steps | Expected results |
| --- | --- | --- | --- |
| High · Complete checkout | Incorrect totals or missing confirmation undermine order trust and can lead to duplicate attempts. | Sign in, add one Sauce Labs Backpack, start checkout, and enter Test Shopper and postal code 00100. Review the order, select Finish, then return to the cart. | Overview shows one backpack, a $29.99 subtotal, $2.40 tax, and a $32.39 total. “Thank you for your order!” appears and the cart is empty. |
| High · Reject a locked account | A locked shopper could gain access despite the account restriction. | Sign in as the configured `lockedUser`. | The login screen remains visible, the locked-account message is shown, and the product catalog does not open. |
| High · Block incomplete checkout | An order could proceed with missing delivery information. | Sign in, add a product, and start checkout. Fill both names, leave postal code blank, and select Continue. Enter 00100 and select Continue again. | The shopper stays on the information screen and sees “Postal Code is required.” After correction, the order overview opens with the selected item. |
| Medium · Keep cart contents in sync | Stale quantities or unwanted items could carry into checkout. | Sign in, add the Backpack and Bike Light, open the cart, and remove the Bike Light. Return to Products and reopen the cart. | Both items initially appear with quantity one and a badge of 2. After removal and navigation, only the Backpack remains and the badge shows 1. |
| Medium · Sort prices and open the correct product | Shoppers could compare prices incorrectly or land on the wrong product after sorting. | Sign in, sort Products by Price (low to high), then open the Sauce Labs Backpack from the sorted list. | Visible prices are in nondecreasing numeric order. The details show the Backpack and the same price as its catalog card. |
