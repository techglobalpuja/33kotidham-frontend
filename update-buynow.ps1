$content = Get-Content "src/app/store/product/[id]/page.tsx" -Raw

# Replace the buyNow function
$content = $content -replace "const buyNow = \(\) => \{[^}]*alert\('Proceeding to checkout!'\);[^}]*\};", @"
const buyNow = () => {
    if (product) {
      // Store product data in localStorage for checkout
      localStorage.setItem('checkoutProduct', JSON.stringify({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1
      }));
      // Navigate to checkout
      window.location.href = '/store/checkout';
    }
  };
"@

$content | Set-Content "src/app/store/product/[id]/page.tsx" -NoNewline
Write-Host "Updated buyNow function successfully"
