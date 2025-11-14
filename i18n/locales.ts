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
  },
};

export const getDirection = (locale: Locale): 'ltr' | 'rtl' => {
  return locale === 'ar' ? 'rtl' : 'ltr';
};