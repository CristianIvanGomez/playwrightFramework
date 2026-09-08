import { expect } from '@playwright/test';
import type { Locator } from '@playwright/test';

export async function addAllProductsToCart(
  addToCartButtonLocator: Locator,
  addToCartToastMessageLocator: Locator
): Promise<void> {
    const total = await addToCartButtonLocator.count();
    for (let i = 0; i < total; i++) {
    await addToCartButtonLocator.nth(i).click();
    await expect(addToCartToastMessageLocator).toBeVisible();
    await addToCartToastMessageLocator.waitFor({ state: 'hidden' });
  }
}