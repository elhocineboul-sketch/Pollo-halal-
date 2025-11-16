import { Locale } from '../types';

export const translations = {
  es: {
    appName: 'Pollo Halal',
    appTagline: '100% Pollo Halal',
    searchPlaceholder: 'Buscar...',
    chickenProductsTitle: 'Productos de Pollo',
    adminPanelAria: 'Panel de administración',
    cartAria: 'Cesta de la compra',
    addToCartButton: '➕ Añadir al carrito',
    adminLoginTitle: 'Acceso de administrador',
    usernamePlaceholder: 'Nombre de usuario',
    emailPlaceholder: 'Correo electrónico',
    passwordPlaceholder: 'Contraseña',
    loginButton: 'Entrar',
    cancelButton: 'Cancelar',
    incorrectPasswordAlert: '¡Contraseña incorrecta!',
    productDeletedSuccess: '✓ Producto eliminado',
    productUpdatedSuccess: '✓ Producto actualizado',
    productAddedSuccess: '✓ Producto añadido',
    notEnoughStock: 'No hay suficiente stock de {productName}. Disponible: {availableUnits} unidades.',
    addedToCartSuccess: '✓ ¡Se añadió {productName} al carrito!',
    notEnoughStockShort: 'No hay suficiente stock. Disponible: {availableUnits} unidades.',
    removedFromCartSuccess: '✓ Producto eliminado del carrito',
    cartEmptyError: 'El carrito está vacío, no se puede completar la compra.',
    purchaseSuccessShort: '✅ ¡Pedido confirmado con éxito! 🎉', // Shorter success message for toast
    paymentSettingsSaved: '✓ Ajustes de pago guardados',
    salePriceWarning: 'Advertencia: ¡El precio de venta es inferior al precio al por mayor! ¿Desea continuar?',
    fillAllFieldsError: '¡Por favor, complete todos los campos con números válidos mayores que cero!',
    wholesalePriceLabel: 'Precio al por mayor:',
    salePriceLabel: 'Precio de venta:',
    profitLabel: 'Ganancia:',
    editButton: '✏️ Editar',
    deleteButton: '🗑️ Eliminar',
    editProductTitle: 'Editar producto',
    addProductTitle: 'Añadir nuevo producto',
    chooseImageLabel: '📷 Elegir imagen del producto',
    productNamePlaceholder: 'Nombre del producto',
    productDescriptionPlaceholder: 'Descripción del producto',
    productCategoryPlaceholder: 'Categoría (Opcional)', // New
    wholesalePricePlaceholder: 'Precio al por mayor ($)',
    salePricePlaceholder: 'Precio de venta ($)',
    unitWeightKgPlaceholder: 'Peso unitario en kg (ej: 0.5)',
    initialUnitsStockPlaceholder: 'Stock inicial en unidades',
    expectedProfitLabel: 'Ganancia esperada:',
    profitPercentageLabel: 'Porcentaje de ganancia:',
    saveProductButton: '💾 Guardar producto',
    backToHomeAria: 'Volver a la página de inicio',
    adminPanelTitle: 'Panel de administración',
    adminPanelSubtitle: 'Gestión de productos y precios',
    exitAria: 'Salir',
    addProductButton: '➕ Añadir nuevo producto',
    activatePaymentButton: '💳 Activar método de pago',
    inventoryManagementTitle: 'Gestión de inventario',
    productTableHeading: 'Producto',
    categoryTableHeading: 'Categoría', // New
    noCategory: 'Sin categoría', // New
    wholesaleUnitTableHeading: 'Venta al por mayor (unidad)',
    sale500gTableHeading: 'Venta 500g',
    kgPurchasedTableHeading: 'Kg comprados',
    kgSoldTableHeading: 'Kg vendidos',
    kgRemainingTableHeading: 'Kg restantes',
    unitsRemainingTableHeading: 'Unidades restantes',
    kgUnit: 'kg',
    confirmDeleteProduct: '¿Estás seguro de eliminar este producto?',
    activatePaymentTitle: 'Activar método de pago',
    activatePaymentDescription: 'Activar o desactivar las opciones de pago para su tienda.',
    codLabel: 'Pago contra reembolso',
    onlinePaymentLabel: 'Pago en línea',
    saveSettingsButton: 'Guardar ajustes',
    cartTitle: 'Cesta de la compra',
    cartEmptyMessage: 'Tu carrito está vacío.',
    perPieceUnit: '/ pieza',
    decreaseQuantityAria: 'Disminuir cantidad de {productName}',
    increaseQuantityAria: 'Aumentar cantidad de {productName}',
    removeItemAria: 'Eliminar {productName} del carrito',
    totalAmountLabel: 'Monto total:',
    closeCartButton: 'Cerrar carrito',
    settingsTitle: 'Ajustes',
    changeLanguageOption: '🌐 Cambiar idioma',
    adminLoginOption: '⚙️ Acceso de administrador',
    selectLanguageTitle: 'Seleccionar idioma',
    languageSpanish: 'Español',
    languageEnglish: 'Inglés',
    languageArabic: 'العربية',
    customersListTitle: 'Lista de clientes',
    viewCustomersButton: '👥 Ver clientes',
    customerNameTableHeading: 'Nombre',
    customerEmailTableHeading: 'Correo electrónico',
    customerPhoneTableHeading: 'Teléfono',
    customerAddressTableHeading: 'Dirección',
    customerTotalPurchasesTableHeading: 'Compras totales',
    customerNotFoundMessage: 'No se encontraron clientes.',
    invoiceOptionsLabel: 'Opciones de factura:',
    sendInvoiceWhatsApp: 'Enviar factura por WhatsApp',
    sendInvoiceEmail: 'Enviar factura por Email',
    invoiceSentWhatsApp: '✓ Factura enviada con éxito por WhatsApp.',
    invoiceSentEmail: '✓ Factura enviada con éxito por Email.',
    confirmOrderButton: '✅ Confirmar pedido',
    manageInventoryButton: '📦 Gestionar inventario', // New
    viewOrdersButton: 'Ver Pedidos', // New
    customerOrdersTitle: 'Pedidos de {customerName}', // New
    orderIdTableHeading: 'ID de Pedido', // New
    orderDateTableHeading: 'Fecha', // New
    orderTotalTableHeading: 'Total', // New
    orderItemsTableHeading: 'Artículos', // New
    noOrdersFoundMessage: 'No se encontraron pedidos para este cliente.', // New
    productName: 'Producto', // New
    quantity: 'Cantidad', // New
    price: 'Precio', // New
    // New translations for multi-step cart
    customerInfoTitle: 'Información del cliente',
    customerNamePlaceholder: 'Nombre completo',
    customerPhonePlaceholder: 'Número de teléfono',
    customerEmailPlaceholder: 'Correo electrónico',
    customerAddressPlaceholder: 'Dirección de envío',
    fillCustomerInfoError: 'Por favor, rellene toda la información del cliente.',
    proceedToOrderButton: 'Continuar con el pedido',
    backButton: 'Volver',
    customerDetailsSummaryTitle: 'Resumen de datos del cliente',
    purchaseCancelledMessage: '✖️ Compra cancelada por el usuario.', // Clarified message
    purchaseErrorMessage: '❌ Error al procesar la compra. Por favor, inténtelo de nuevo.',
    selectPaymentMethodTitle: 'Seleccionar método de pago', // New
    paymentMethodLabel: 'Método de pago:', // New
    codOptionLabel: 'Pago contra reembolso', // New
    onlineOptionLabel: 'Pago en línea', // New
    expectedDeliveryLabel: 'Entrega esperada:', // New
    deliveryTime: 'en 24 horas', // New static value for now
    paymentMethodRequiredError: 'Por favor, seleccione un método de pago.', // New
    customerStatusTableHeading: 'Estado', // New
    newCustomerStatus: 'Nuevo', // New
    returningCustomerStatus: 'Recurrente', // New
    // OrderConfirmationModal specific translations
    orderConfirmationTitle: 'Confirmación de Pedido',
    orderTrackingLinkTitle: 'Enlace de seguimiento:',
    shareOrderButton: '🔗 Compartir Pedido',
    closeModalButton: 'Cerrar',
    shareOrderSubject: '¡Tu pedido de Pollo Halal ha sido confirmado!',
    shareOrderText: `¡Tu pedido #{orderId} ha sido confirmado!
Nombre: {customerName}
Teléfono: {customerPhone}
Email: {customerEmail}
Dirección: {customerAddress}
Monto total: ${'{totalAmount}'}
Método de pago: {paymentMethod}
Entrega estimada: {expectedDelivery}
Rastrea tu pedido aquí: {orderTrackingLink}
¡Gracias por tu compra!`,
    // Nequi specific translations
    nequiPaymentLabel: 'Pago con Nequi',
    nequiInstructionsTitle: 'Pasos para pagar con Nequi',
    nequiStep1: '1. Elija Nequi como su método de pago.',
    nequiStep2: '2. Transfiera el monto total a nuestro número de Nequi: 320 555 1234 o escanee el código QR.',
    nequiStep3: '3. Envíe una captura de pantalla del recibo de pago al completar la transacción.',
    nequiStep4: '4. Espere la confirmación. Su pedido se procesará después de la verificación.',
    nequiQrCodeAria: 'Código QR para pago con Nequi',
    // New: Low Stock Alert
    lowStockAlert: '🚨 ¡Stock bajo para {productName}! Unidades restantes: {unitsRemaining}.',
    // New: Dark Mode
    darkModeOption: '🌙 Modo oscuro',
    enableDarkMode: 'Activar modo oscuro',
    disableDarkMode: 'Desactivar modo oscuro',
    // New: Offer Management
    manageOffersButton: '🏷️ Gestionar Ofertas',
    offerManagementTitle: 'Gestión de Ofertas',
    offerNameTableHeading: 'Nombre de la Oferta',
    offerTypeTableHeading: 'Tipo',
    offerValueTableHeading: 'Valor',
    offerTargetProductTableHeading: 'Producto Objetivo',
    offerStatusTableHeading: 'Estado',
    addOfferButton: '➕ Añadir Nueva Oferta',
    noOffersFound: 'No se encontraron ofertas.',
    editOfferTitle: 'Editar Oferta',
    createOfferTitle: 'Crear Nueva Oferta',
    offerNamePlaceholder: 'Nombre de la Oferta',
    selectOfferType: 'Seleccionar Tipo de Oferta',
    selectTargetProduct: 'Seleccionar Producto Objetivo',
    offerValuePlaceholder: 'Valor (%, $)', // Updated
    offerActiveLabel: 'Activa',
    saveOfferButton: '💾 Guardar Oferta',
    percentageDiscount: 'Descuento Porcentual',
    fixedDiscount: 'Descuento Fijo',
    buyXGetYFree: 'Comprar X Obtener Y Gratis', // New
    buyXPlaceholder: 'Comprar Cantidad (X)', // New
    getYFreePlaceholder: 'Obtener Gratis (Y)', // New
    confirmDeleteOffer: '¿Estás seguro de eliminar esta oferta?',
    offerDeletedSuccess: '✓ Oferta eliminada',
    offerAddedSuccess: '✓ Oferta añadida',
    offerUpdatedSuccess: '✓ Oferta actualizada',
    offerActive: 'Activa',
    offerInactive: 'Inactiva',
    productAlreadyHasOffer: '❌ El producto "{productName}" ya tiene una oferta activa.',
    productAlreadyHasOtherActiveOffer: '❌ El producto "{productName}" ya tiene otra oferta activa.',
    offerProductPlaceholder: 'Producto...',
    discountBadge: '🏷️ ¡Oferta!',
    buyXGetYFreeBadge: '🎉 ¡{buyQuantity} + {getFreeQuantity} Gratis!', // New
    buyOneGetOneFree: '¡Compra 1 y Llévate 1 Gratis!', // kept for product card, if needed
    discountApplied: 'Descuento Aplicado: -{value}{unit}',
    buyXGetYFreeApplied: 'Oferta Aplicada: ¡Compre {buyQuantity} y obtenga {getFreeQuantity} gratis!', // New
    offerValueRequired: 'El valor de la oferta es obligatorio.',
    offerTargetProductRequired: 'El producto objetivo es obligatorio.',
    offerNameRequired: 'El nombre de la oferta es obligatorio.',
    buyQuantityRequired: 'La cantidad a comprar (X) es obligatoria.', // New
    getFreeQuantityRequired: 'La cantidad a obtener gratis (Y) es obligatoria.', // New
    logoutButton: 'Cerrar sesión', // New translation
    loggedOutSuccess: '✓ Sesión cerrada con éxito.',
    goToAdminPanelButton: '🚀 لوحة التحكم', // New: Go to Admin Panel
    loading: 'Cargando', // New
    // Gemini Recipe Feature
    smartChefButton: 'Asistente de Chef Inteligente',
    getRecipeSuggestion: 'Obtener sugerencia de receta',
    recipeModalTitle: 'Sugerencia del Chef',
    recipeLoading: 'Nuestro chef está pensando... 🧑‍🍳',
    recipeError: 'Lo sentimos, el chef está ocupado en este momento. Por favor, inténtelo de nuevo más tarde.',
    cartIsEmptyForChef: '¡Añade artículos a tu carrito para obtener una receta!',
    geminiPrompt: 'Actúa como un chef experto. Tengo los siguientes productos de pollo en mi carrito de compras: {cartContents}. Sugiere una receta deliciosa y fácil de seguir que pueda hacer con estos artículos. Proporciona una lista de ingredientes adicionales que podría necesitar y las instrucciones paso a paso. La receta debe estar en {locale}. Formatea la respuesta en Markdown con encabezados para "Ingredientes" e "Instrucciones".',
  },
  en: {
    appName: 'Pollo Halal',
    appTagline: '100% Halal Chicken',
    searchPlaceholder: 'Search...',
    chickenProductsTitle: 'Chicken Products',
    adminPanelAria: 'Admin panel',
    cartAria: 'Shopping cart',
    addToCartButton: '➕ Add to Cart',
    adminLoginTitle: 'Admin Login',
    usernamePlaceholder: 'Username',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Password',
    loginButton: 'Login',
    cancelButton: 'Cancel',
    incorrectPasswordAlert: 'Incorrect password!',
    productDeletedSuccess: '✓ Product deleted',
    productUpdatedSuccess: '✓ Product updated',
    productAddedSuccess: '✓ Product added',
    notEnoughStock: 'Not enough stock of {productName}. Available: {availableUnits} units.',
    addedToCartSuccess: '✓ {productName} added to cart!',
    notEnoughStockShort: 'Not enough stock. Available: {availableUnits} units.',
    removedFromCartSuccess: '✓ Product removed from cart.',
    cartEmptyError: 'Cart is empty, cannot complete purchase.',
    purchaseSuccessShort: '✅ Order confirmed successfully! 🎉', // Shorter success message for toast
    paymentSettingsSaved: '✓ Payment settings saved',
    salePriceWarning: 'Warning: Sale price is less than wholesale price! Do you want to continue?',
    fillAllFieldsError: 'Please complete all fields with valid numbers greater than zero!',
    wholesalePriceLabel: 'Wholesale Price:',
    salePriceLabel: 'Sale Price:',
    profitLabel: 'Profit:',
    editButton: '✏️ Edit',
    deleteButton: '🗑️ Delete',
    editProductTitle: 'Edit Product',
    addProductTitle: 'Add New Product',
    chooseImageLabel: '📷 Choose Product Image',
    productNamePlaceholder: 'Product Name',
    productDescriptionPlaceholder: 'Product Description',
    productCategoryPlaceholder: 'Category (Optional)', // New
    wholesalePricePlaceholder: 'Wholesale Price ($)',
    salePricePlaceholder: 'Sale Price ($)',
    unitWeightKgPlaceholder: 'Unit Weight in Kg (e.g., 0.5)',
    initialUnitsStockPlaceholder: 'Initial Units Stock',
    expectedProfitLabel: 'Expected Profit:',
    profitPercentageLabel: 'Profit Percentage:',
    saveProductButton: '💾 Save Product',
    backToHomeAria: 'Back to home page',
    adminPanelTitle: 'Admin Panel',
    adminPanelSubtitle: 'Manage Products and Prices',
    exitAria: 'Exit',
    addProductButton: '➕ Add New Product',
    activatePaymentButton: '💳 Activate Payment Method',
    inventoryManagementTitle: 'Inventory Management',
    productTableHeading: 'Product',
    categoryTableHeading: 'Category', // New
    noCategory: 'No Category', // New
    wholesaleUnitTableHeading: 'Wholesale (Unit)',
    sale500gTableHeading: 'Sale 500g',
    kgPurchasedTableHeading: 'Kg Purchased',
    kgSoldTableHeading: 'Kg Sold',
    kgRemainingTableHeading: 'Kg Remaining',
    unitsRemainingTableHeading: 'Units Remaining',
    kgUnit: 'kg',
    confirmDeleteProduct: 'Are you sure you want to delete this product?',
    activatePaymentTitle: 'Activate Payment Method',
    activatePaymentDescription: 'Activate or deactivate payment options for your store.',
    codLabel: 'Cash on Delivery',
    onlinePaymentLabel: 'Online Payment',
    saveSettingsButton: 'Save Settings',
    cartTitle: 'Shopping Cart',
    cartEmptyMessage: 'Your cart is empty.',
    perPieceUnit: '/ piece',
    decreaseQuantityAria: 'Decrease quantity of {productName}',
    increaseQuantityAria: 'Increase quantity of {productName}',
    removeItemAria: 'Remove {productName} from cart',
    totalAmountLabel: 'Total Amount:',
    closeCartButton: 'Close Cart',
    settingsTitle: 'Settings',
    changeLanguageOption: '🌐 Change Language',
    adminLoginOption: '⚙️ Admin Login',
    selectLanguageTitle: 'Select Language',
    languageSpanish: 'Spanish',
    languageEnglish: 'English',
    languageArabic: 'العربية',
    customersListTitle: 'Customer List',
    viewCustomersButton: '👥 View Customers',
    customerNameTableHeading: 'Name',
    customerEmailTableHeading: 'Email',
    customerPhoneTableHeading: 'Phone',
    customerAddressTableHeading: 'Address',
    customerTotalPurchasesTableHeading: 'Total Purchases',
    customerNotFoundMessage: 'No customers found.',
    invoiceOptionsLabel: 'Invoice Options:',
    sendInvoiceWhatsApp: 'Send invoice via WhatsApp',
    sendInvoiceEmail: 'Send invoice via Email',
    invoiceSentWhatsApp: '✓ Invoice sent successfully via WhatsApp.',
    invoiceSentEmail: '✓ Invoice sent successfully via Email.',
    confirmOrderButton: '✅ Confirm Order',
    manageInventoryButton: '📦 Manage Inventory', // New
    viewOrdersButton: 'View Orders', // New
    customerOrdersTitle: 'Orders for {customerName}', // New
    orderIdTableHeading: 'Order ID', // New
    orderDateTableHeading: 'Date', // New
    orderTotalTableHeading: 'Total', // New
    orderItemsTableHeading: 'Items', // New
    noOrdersFoundMessage: 'No orders found for this customer.', // New
    productName: 'Product', // New
    quantity: 'Quantity', // New
    price: 'Price', // New
    // New translations for multi-step cart
    customerInfoTitle: 'Customer Information',
    customerNamePlaceholder: 'Full Name',
    customerPhonePlaceholder: 'Phone Number',
    customerEmailPlaceholder: 'Email Address',
    customerAddressPlaceholder: 'Shipping Address',
    fillCustomerInfoError: 'Please fill in all customer information.',
    proceedToOrderButton: 'Proceed to Order',
    backButton: 'Back',
    customerDetailsSummaryTitle: 'Customer Details Summary',
    purchaseCancelledMessage: '✖️ Purchase cancelled by user.', // Clarified message
    purchaseErrorMessage: '❌ Error processing purchase. Please try again.',
    selectPaymentMethodTitle: 'Select Payment Method', // New
    paymentMethodLabel: 'Payment Method:', // New
    codOptionLabel: 'Cash on Delivery', // New
    onlineOptionLabel: 'Online Payment', // New
    expectedDeliveryLabel: 'Expected Delivery:', // New
    deliveryTime: 'within 24 hours', // New static value for now
    paymentMethodRequiredError: 'Please select a payment method.', // New
    customerStatusTableHeading: 'Status', // New
    newCustomerStatus: 'New', // New
    returningCustomerStatus: 'Returning', // New
    // OrderConfirmationModal specific translations
    orderConfirmationTitle: 'Order Confirmation',
    orderTrackingLinkTitle: 'Tracking Link:',
    shareOrderButton: '🔗 Share Order',
    closeModalButton: 'Close',
    shareOrderSubject: 'Your Pollo Halal order has been confirmed!',
    shareOrderText: `Your order #{orderId} has been confirmed!
Name: {customerName}
Phone: {customerPhone}
Email: {customerEmail}
Address: {customerAddress}
Total Amount: ${'{totalAmount}'}
Payment Method: {paymentMethod}
Expected Delivery: {expectedDelivery}
Track your order here: {orderTrackingLink}
Thank you for your purchase!`,
    // Nequi specific translations
    nequiPaymentLabel: 'Pay with Nequi',
    nequiInstructionsTitle: 'Steps to pay with Nequi',
    nequiStep1: '1. Choose Nequi as your preferred payment method.',
    nequiStep2: '2. Transfer the total amount to our Nequi number: 320 555 1234 or scan the QR code.',
    nequiStep3: '3. Send a screenshot of the payment receipt after completing the transaction.',
    nequiStep4: '4. Await confirmation. Your order will be processed after verification.',
    nequiQrCodeAria: 'QR Code for Nequi payment',
    // New: Low Stock Alert
    lowStockAlert: '🚨 Low stock for {productName}! Units remaining: {unitsRemaining}.',
    // New: Dark Mode
    darkModeOption: '🌙 Dark Mode',
    enableDarkMode: 'Enable Dark Mode',
    disableDarkMode: 'Disable Dark Mode',
    // New: Offer Management
    manageOffersButton: '🏷️ Manage Offers',
    offerManagementTitle: 'Offer Management',
    offerNameTableHeading: 'Offer Name',
    offerTypeTableHeading: 'Type',
    offerValueTableHeading: 'Value',
    offerTargetProductTableHeading: 'Target Product',
    offerStatusTableHeading: 'Status',
    addOfferButton: '➕ Add New Offer',
    noOffersFound: 'No offers found.',
    editOfferTitle: 'Edit Offer',
    createOfferTitle: 'Create New Offer',
    offerNamePlaceholder: 'Offer Name',
    selectOfferType: 'Select Offer Type',
    selectTargetProduct: 'Select Target Product',
    offerValuePlaceholder: 'Value (%, $)', // Updated
    offerActiveLabel: 'Active',
    saveOfferButton: '💾 Save Offer',
    percentageDiscount: 'Percentage Discount',
    fixedDiscount: 'Fixed Discount',
    buyXGetYFree: 'Buy X Get Y Free', // New
    buyXPlaceholder: 'Buy Quantity (X)', // New
    getYFreePlaceholder: 'Get Free (Y)', // New
    confirmDeleteOffer: 'Are you sure you want to delete this offer?',
    offerDeletedSuccess: '✓ Offer deleted',
    offerAddedSuccess: '✓ Offer added',
    offerUpdatedSuccess: '✓ Offer updated',
    offerActive: 'Active',
    offerInactive: 'Inactive',
    productAlreadyHasOffer: '❌ Product "{productName}" already has an active offer.',
    productAlreadyHasOtherActiveOffer: '❌ Product "{productName}" already has another active offer.',
    offerProductPlaceholder: 'Product...',
    discountBadge: '🏷️ Offer!',
    buyXGetYFreeBadge: '🎉 Buy {buyQuantity} Get {getFreeQuantity} Free!', // New
    buyOneGetOneFree: 'Buy 1 Get 1 Free!', // kept for product card, if needed
    discountApplied: 'Discount Applied: -{value}{unit}',
    buyXGetYFreeApplied: 'Offer Applied: Buy {buyQuantity} Get {getFreeQuantity} Free!', // New
    offerValueRequired: 'Offer value is required.',
    offerTargetProductRequired: 'Target product is required.',
    offerNameRequired: 'Offer name is required.',
    buyQuantityRequired: 'Buy quantity (X) is required.', // New
    getFreeQuantityRequired: 'Get free quantity (Y) is required.', // New
    logoutButton: 'Logout', // New translation
    loggedOutSuccess: '✓ Logged out successfully.',
    goToAdminPanelButton: '🚀 Admin Panel', // New: Go to Admin Panel
    loading: 'Loading', // New
    // Gemini Recipe Feature
    smartChefButton: 'Smart Chef Assistant',
    getRecipeSuggestion: 'Get Recipe Suggestion',
    recipeModalTitle: "Chef's Suggestion",
    recipeLoading: "Our chef is thinking... 🧑‍🍳",
    recipeError: "Sorry, the chef is busy right now. Please try again later.",
    cartIsEmptyForChef: "Add items to your cart to get a recipe!",
    geminiPrompt: 'Act as an expert chef. I have the following chicken products in my shopping cart: {cartContents}. Suggest a delicious and easy-to-follow recipe I can make with these items. Provide a list of additional ingredients I might need and the step-by-step instructions. The recipe should be in {locale}. Format the response in Markdown with headings for "Ingredients" and "Instructions".',
  },
  ar: {
    appName: 'Pollo Halal',
    appTagline: 'دجاج حلال 100%',
    searchPlaceholder: 'بحث...',
    chickenProductsTitle: 'منتجات الدجاج',
    adminPanelAria: 'لوحة التحكم',
    cartAria: 'السلة',
    addToCartButton: '➕ أضف إلى السلة',
    adminLoginTitle: 'تسجيل دخول المشرف',
    usernamePlaceholder: 'اسم المستخدم',
    emailPlaceholder: 'البريد الإلكتروني',
    passwordPlaceholder: 'كلمة المرور',
    loginButton: 'دخول',
    cancelButton: 'إلغاء',
    incorrectPasswordAlert: 'كلمة المرور خاطئة!',
    productDeletedSuccess: '✓ تم حذف المنتج',
    productUpdatedSuccess: '✓ تم تحديث المنتج',
    productAddedSuccess: '✓ تم إضافة المنتج',
    notEnoughStock: 'لا يوجد مخزون كافٍ من {productName}. المتوفر: {availableUnits} وحدة.',
    addedToCartSuccess: '✓ تم إضافة {productName} إلى السلة!',
    notEnoughStockShort: 'لا يوجد مخزون كافٍ. المتوفر: {availableUnits} وحدة.',
    removedFromCartSuccess: '✓ تم حذف المنتج من السلة.',
    cartEmptyError: 'السلة فارغة، لا يمكن إتمام الشراء.',
    purchaseSuccessShort: '✅ تم تأكيد الطلب بنجاح! 🎉', // Shorter success message for toast
    paymentSettingsSaved: '✓ تم حفظ إعدادات الدفع',
    salePriceWarning: 'تحذير: سعر البيع أقل من سعر الجملة! هل تريد المتابعة؟',
    fillAllFieldsError: 'الرجاء إكمال جميع الحقول بأرقام صحيحة أكبر من صفر!',
    wholesalePriceLabel: 'سعر الجملة:',
    salePriceLabel: 'سعر البيع:',
    profitLabel: 'الربح:',
    editButton: '✏️ تعديل',
    deleteButton: '🗑️ حذف',
    editProductTitle: 'تعديل المنتج',
    addProductTitle: 'إضافة منتج جديد',
    chooseImageLabel: '📷 اختر صورة المنتج',
    productNamePlaceholder: 'اسم المنتج',
    productDescriptionPlaceholder: 'وصف المنتج',
    productCategoryPlaceholder: 'الفئة (اختياري)', // New
    wholesalePricePlaceholder: 'سعر الجملة ($)',
    salePricePlaceholder: 'سعر البيع ($)',
    unitWeightKgPlaceholder: 'وزن الوحدة بالكيلوجرام (مثال: 0.5)',
    initialUnitsStockPlaceholder: 'الكمية الأولية بالوحدات',
    expectedProfitLabel: 'الربح المتوقع:',
    profitPercentageLabel: 'نسبة الربح:',
    saveProductButton: '💾 حفظ المنتج',
    backToHomeAria: 'العودة للصفحة الرئيسية',
    adminPanelTitle: 'لوحة التحكم',
    adminPanelSubtitle: 'إدارة المنتجات والأسعار',
    exitAria: 'الخروج',
    addProductButton: '➕ إضافة منتج جديد',
    activatePaymentButton: '💳 تفعيل طريقة الدفع',
    inventoryManagementTitle: 'إدارة المخزون',
    productTableHeading: 'المنتج',
    categoryTableHeading: 'الفئة', // New
    noCategory: 'بلا فئة', // New
    wholesaleUnitTableHeading: 'جملة الوحدة',
    sale500gTableHeading: 'بيع 500g',
    kgPurchasedTableHeading: 'كجم مشتراة',
    kgSoldTableHeading: 'كجم مباعة',
    kgRemainingTableHeading: 'كجم متبقية',
    unitsRemainingTableHeading: 'وحدات متبقية',
    kgUnit: 'كجم',
    confirmDeleteProduct: 'هل أنت متأكد من حذف هذا المنتج؟',
    activatePaymentTitle: 'تفعيل طريقة الدفع',
    activatePaymentDescription: 'قم بتفعيل أو إلغاء تفعيل خيارات الدفع لمتجرك.',
    codLabel: 'الدفع عند الاستلام',
    onlinePaymentLabel: 'الدفع عبر الإنترنت',
    saveSettingsButton: 'حفظ الإعدادات',
    cartTitle: 'سلة المشتريات',
    cartEmptyMessage: 'سلتك فارغة.',
    perPieceUnit: '/ قطعة',
    decreaseQuantityAria: 'تقليل كمية {productName}',
    increaseQuantityAria: 'زيادة كمية {productName}',
    removeItemAria: 'إزالة {productName} من السلة',
    totalAmountLabel: 'المجموع الكلي:',
    closeCartButton: 'إغلاق السلة',
    settingsTitle: 'الإعدادات',
    changeLanguageOption: '🌐 تغيير اللغة',
    adminLoginOption: '⚙️ تسجيل دخول المشرف',
    selectLanguageTitle: 'تحديد اللغة',
    languageSpanish: 'الإسبانية',
    languageEnglish: 'الإنجليزية',
    languageArabic: 'العربية',
    customersListTitle: 'قائمة الزبائن',
    viewCustomersButton: '👥 عرض الزبائن',
    customerNameTableHeading: 'الاسم',
    customerEmailTableHeading: 'البريد الإلكتروني',
    customerPhoneTableHeading: 'الهاتف',
    customerAddressTableHeading: 'العنوان',
    customerTotalPurchasesTableHeading: 'إجمالي المشتريات',
    customerNotFoundMessage: 'لم يتم العثور على زبائن.',
    invoiceOptionsLabel: 'خيارات الفاتورة:',
    sendInvoiceWhatsApp: 'إرسال الفاتورة عبر واتساب',
    sendInvoiceEmail: 'إرسال الفاتورة عبر البريد الإلكتروني',
    invoiceSentWhatsApp: '✓ تم إرسال الفاتورة بنجاح عبر واتساب.',
    invoiceSentEmail: '✓ تم إرسال الفاتورة بنجاح عبر البريد الإلكتروني.',
    confirmOrderButton: '✅ تأكيد الطلب',
    manageInventoryButton: '📦 إدارة المخزون', // New
    viewOrdersButton: 'عرض الطلبات', // New
    customerOrdersTitle: 'طلبات {customerName}', // New
    orderIdTableHeading: 'رقم الطلب', // New
    orderDateTableHeading: 'التاريخ', // New
    orderTotalTableHeading: 'الإجمالي', // New
    orderItemsTableHeading: 'المنتجات', // New
    noOrdersFoundMessage: 'لم يتم العثور على طلبات لهذا الزبون.', // New
    productName: 'المنتج', // New
    quantity: 'الكمية', // New
    price: 'السعر', // New
    // New translations for multi-step cart
    customerInfoTitle: 'معلومات الزبون',
    customerNamePlaceholder: 'الاسم الكامل',
    customerPhonePlaceholder: 'رقم الهاتف',
    customerEmailPlaceholder: 'البريد الإلكتروني',
    customerAddressPlaceholder: 'عنوان الشحن',
    fillCustomerInfoError: 'الرجاء ملء جميع معلومات الزبون.',
    proceedToOrderButton: 'المتابعة للطلب',
    backButton: 'العودة',
    customerDetailsSummaryTitle: 'ملخص بيانات الزبون',
    purchaseCancelledMessage: '✖️ تم إلغاء عملية الشراء من قبلك.', // Clarified message
    purchaseErrorMessage: '❌ حدث خطأ أثناء معالجة الطلب. الرجاء المحاولة مرة أخرى.',
    selectPaymentMethodTitle: 'تحديد طريقة الدفع', // New
    paymentMethodLabel: 'طريقة الدفع:', // New
    codOptionLabel: 'الدفع عند الاستلام', // New
    onlineOptionLabel: 'الدفع عبر الإنترنت', // New
    expectedDeliveryLabel: 'التسليم المتوقع:', // New
    deliveryTime: 'خلال 24 ساعة', // New static value for now
    paymentMethodRequiredError: 'الرجاء تحديد طريقة دفع.', // New
    customerStatusTableHeading: 'الحالة', // New
    newCustomerStatus: 'جديد', // New
    returningCustomerStatus: 'عائد', // New
    // OrderConfirmationModal specific translations
    orderConfirmationTitle: 'تأكيد الطلب',
    orderTrackingLinkTitle: 'رابط التتبع:',
    shareOrderButton: '🔗 مشاركة الطلب',
    closeModalButton: 'إغلاق',
    shareOrderSubject: 'لقد تم تأكيد طلبك من Pollo Halal!',
    shareOrderText: `لقد تم تأكيد طلبك رقم #{orderId}!
الاسم: {customerName}
الهاتف: {customerPhone}
البريد الإلكتروني: {customerEmail}
العنوان: {customerAddress}
المبلغ الإجمالي: ${'{totalAmount}'}
طريقة الدفع: {paymentMethod}
التسليم المتوقع: {expectedDelivery}
تتبع طلبك هنا: {orderTrackingLink}
شكراً لك على طلبك!`,
    // Nequi specific translations
    nequiPaymentLabel: 'الدفع عبر Nequi',
    nequiInstructionsTitle: 'خطوات الدفع عبر Nequi',
    nequiStep1: '1. اختر Nequi كوسيلة دفع مفضلة لديك.',
    nequiStep2: '2. قم بتحويل المبلغ المطلوب إلى رقم Nequi الخاص بنا: 320 555 1234 أو امسح رمز QR.',
    nequiStep3: '3. التقط لقطة شاشة لإيصال الدفع وأرسلها لنا بعد إتمام المعاملة.',
    nequiStep4: '4. انتظر التأكيد. سيتم معالجة طلبك بعد التحقق.',
    nequiQrCodeAria: 'رمز QR للدفع عبر Nequi',
    // New: Low Stock Alert
    lowStockAlert: '🚨 مخزون منخفض لـ {productName}! الوحدات المتبقية: {unitsRemaining}.',
    // New: Dark Mode
    darkModeOption: '🌙 الوضع الليلي',
    enableDarkMode: 'تفعيل الوضع الليلي',
    disableDarkMode: 'تعطيل الوضع الليلي',
    // New: Offer Management
    manageOffersButton: '🏷️ إدارة العروض',
    offerManagementTitle: 'إدارة العروض',
    offerNameTableHeading: 'اسم العرض',
    offerTypeTableHeading: 'النوع',
    offerValueTableHeading: 'القيمة',
    offerTargetProductTableHeading: 'المنتج المستهدف',
    offerStatusTableHeading: 'الحالة',
    addOfferButton: '➕ إضافة عرض جديد',
    noOffersFound: 'لم يتم العثور على عروض.',
    editOfferTitle: 'تعديل العرض',
    createOfferTitle: 'إنشاء عرض جديد',
    offerNamePlaceholder: 'اسم العرض',
    selectOfferType: 'تحديد نوع العرض',
    selectTargetProduct: 'تحديد المنتج المستهدف',
    offerValuePlaceholder: 'القيمة (%, $)', // Updated
    offerActiveLabel: 'نشط',
    saveOfferButton: '💾 حفظ العرض',
    percentageDiscount: 'خصم بالمئة',
    fixedDiscount: 'خصم ثابت',
    buyXGetYFree: 'اشتر X واحصل على Y مجاناً', // New
    buyXPlaceholder: 'كمية الشراء (X)', // New
    getYFreePlaceholder: 'الكمية المجانية (Y)', // New
    confirmDeleteOffer: 'هل أنت متأكد من حذف هذا العرض؟',
    offerDeletedSuccess: '✓ تم حذف العرض',
    offerAddedSuccess: '✓ تم إضافة العرض',
    offerUpdatedSuccess: '✓ تم تحديث العرض',
    offerActive: 'نشط',
    offerInactive: 'غير نشط',
    productAlreadyHasOffer: '❌ المنتج "{productName}" لديه عرض نشط بالفعل.',
    productAlreadyHasOtherActiveOffer: '❌ المنتج "{productName}" لديه عرض نشط آخر بالفعل.',
    offerProductPlaceholder: 'منتج...',
    discountBadge: '🏷️ عرض!',
    buyXGetYFreeBadge: '🎉 اشترِ {buyQuantity} واحصل على {getFreeQuantity} مجاناً!', // New
    buyOneGetOneFree: 'اشترِ 1 واحصل على 1 مجاناً!',
    discountApplied: 'تم تطبيق الخصم: -{value}{unit}',
    buyXGetYFreeApplied: 'تم تطبيق العرض: اشترِ {buyQuantity} واحصل على {getFreeQuantity} مجاناً!', // New
    offerValueRequired: 'قيمة العرض مطلوبة.',
    offerTargetProductRequired: 'المنتج المستهدف مطلوب.',
    offerNameRequired: 'اسم العرض مطلوب.',
    buyQuantityRequired: 'كمية الشراء (X) مطلوبة.', // New
    getFreeQuantityRequired: 'الكمية المجانية (Y) مطلوبة.', // New
    logoutButton: 'تسجيل خروج', // New translation
    loggedOutSuccess: '✓ تم تسجيل الخروج بنجاح.',
    goToAdminPanelButton: '🚀 لوحة التحكم', // New: Go to Admin Panel
    loading: 'جار التحميل', // New
    // Gemini Recipe Feature
    smartChefButton: 'مساعد الشيف الذكي',
    getRecipeSuggestion: 'احصل على اقتراح وصفة',
    recipeModalTitle: 'اقتراح الشيف',
    recipeLoading: 'الشيف يفكر... 🧑‍🍳',
    recipeError: 'عذراً، الشيف مشغول الآن. يرجى المحاولة مرة أخرى لاحقاً.',
    cartIsEmptyForChef: 'أضف منتجات إلى سلتك للحصول على وصفة!',
    geminiPrompt: 'تصرف كطاهٍ خبير. لدي منتجات الدجاج التالية في عربة التسوق الخاصة بي: {cartContents}. اقترح وصفة لذيذة وسهلة المتابعة يمكنني تحضيرها بهذه المنتجات. قدم قائمة بالمكونات الإضافية التي قد أحتاجها والتعليمات خطوة بخطوة. يجب أن تكون الوصفة باللغة {locale}. نسق الرد باستخدام الماركداون مع عناوين لـ "المكونات" و "التعليمات".',
  },
};

export const getDirection = (locale: Locale): 'ltr' | 'rtl' => {
  return locale === 'ar' ? 'rtl' : 'ltr';
};