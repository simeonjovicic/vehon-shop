import { useState, useEffect, useRef } from "react";

const PRODUCTS = [
    {
        id: 1,
        name: "Accelerator®",
        subtitle: "Driving Slippers",
        price: 406,
        color: "Tan",
        material: "Nappa Leather",
        image: "https://loungersway.com/cdn/shop/products/ACCMNAP_ALL_TAN_sideview_1024x1024.jpg?v=1678185665",
        tag: "Bestseller",
        category: "men",
        url: "https://loungersway.com/products/accelerator-men-slipper-tan",
    },
    {
        id: 2,
        name: "Accelerator®",
        subtitle: "Driving Slippers",
        price: 406,
        color: "Navy",
        material: "Nappa Leather",
        image: "https://loungersway.com/cdn/shop/products/ACCMNAP_ALL_TAN_frontview_1024x1024.jpg?v=1678185665",
        tag: null,
        category: "men",
        url: "https://loungersway.com/products/accelerator-men-slipper-tan",
    },
    {
        id: 3,
        name: "Classic Loafer",
        subtitle: "Indoor / Outdoor",
        price: 488,
        color: "Cognac",
        material: "Calfskin Leather",
        image: "https://loungersway.com/cdn/shop/products/ACCMNAP_ALL_TAN_topview_1024x1024.jpg?v=1639750464",
        tag: "New",
        category: "men",
        url: "https://loungersway.com/collections/men",
    },
    {
        id: 4,
        name: "Heritage Moccasin",
        subtitle: "Hybrid Slipper",
        price: 376,
        color: "Chestnut",
        material: "Nappa Leather",
        image: "https://loungersway.com/cdn/shop/products/ACCMNAP_ALL_TAN_backview_1024x1024.jpg?v=1678185665",
        tag: null,
        category: "men",
        url: "https://loungersway.com/collections/men",
    },
    {
        id: 5,
        name: "Elegance",
        subtitle: "Women's Loafer",
        price: 396,
        color: "Blush",
        material: "Nappa Leather",
        image: "https://loungersway.com/cdn/shop/products/ACCMNAP_ALL_TAN_bottomview_1024x1024.jpg?v=1678185665",
        tag: "New",
        category: "women",
        url: "https://loungersway.com/collections/women",
    },
    {
        id: 6,
        name: "Traveller",
        subtitle: "Driving Shoe",
        price: 434,
        color: "Espresso",
        material: "Calfskin Leather",
        image: "https://loungersway.com/cdn/shop/products/20210621_154922_gray_2_1024x1024.jpg?v=1639750464",
        tag: null,
        category: "men",
        url: "https://loungersway.com/collections/men",
    },
];

const FEATURES = [
    { icon: "✦", title: "Handcrafted in Italy", desc: "Master artisans since 1979" },
    { icon: "◈", title: "Vibram® HydroGrip", desc: "Superior traction & stability" },
    { icon: "○", title: "Barefoot Option", desc: "Removable Sorbothane® insoles" },
    { icon: "◇", title: "Sustainable", desc: "One tree planted per pair" },
];

export default function LoungersShop() {
    const [filter, setFilter] = useState("all");
    const [loaded, setLoaded] = useState(false);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [scrollY, setScrollY] = useState(0);
    const heroRef = useRef(null);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 100);
        const handleScroll = () => setScrollY(window.scrollY || 0);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

    return (
        <div style={styles.page}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@200;300;400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes lineGrow {
          from { width: 0; }
          to { width: 80px; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .product-card {
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 60px rgba(120, 90, 50, 0.1);
        }
        .product-card:hover .product-img {
          transform: scale(1.06);
        }
        .product-img {
          transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .cta-btn {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
          overflow: hidden;
        }
        .cta-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .cta-btn:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        .nav-link {
          position: relative;
          transition: color 0.3s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #3D2B1F;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .filter-btn {
          transition: all 0.3s ease;
        }
        .filter-btn:hover {
          color: #3D2B1F;
        }
        .add-btn {
          transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .add-btn:hover {
          background: #3D2B1F !important;
          color: #FAF7F2 !important;
          letter-spacing: 1.5px;
        }
        .feature-card {
          transition: all 0.4s ease;
        }
        .feature-card:hover {
          background: rgba(61, 43, 31, 0.03);
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #FAF7F2; }
        ::-webkit-scrollbar-thumb { background: #C8B8A0; border-radius: 3px; }
      `}</style>

            {/* Navigation */}
            <nav
                style={{
                    ...styles.nav,
                    backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
                    background: scrollY > 50 ? "rgba(250, 247, 242, 0.92)" : "transparent",
                    borderBottom: scrollY > 50 ? "1px solid rgba(200, 184, 160, 0.2)" : "1px solid transparent",
                }}
            >
                <div style={styles.navInner}>
                    <div style={styles.navLinks}>
                        {["Men", "Women", "Belts"].map((item) => (
                            <a key={item} href={`https://loungersway.com/collections/${item.toLowerCase()}`} className="nav-link" style={styles.navLinkText}>
                                {item}
                            </a>
                        ))}
                    </div>
                    <div style={styles.logoWrap}>
                        <span style={styles.logoText}>LOUNGERS</span>
                        <span style={styles.logoSub}>London × Italy</span>
                    </div>
                    <div style={{ ...styles.navLinks, justifyContent: "flex-end" }}>
                        {["About", "Sustainability"].map((item) => (
                            <a key={item} href={`https://loungersway.com/pages/${item.toLowerCase().replace(" ", "-")}`} className="nav-link" style={styles.navLinkText}>
                                {item}
                            </a>
                        ))}
                        <a href="https://loungersway.com/cart" className="nav-link" style={styles.navLinkText}>
                            Cart (0)
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section ref={heroRef} style={styles.hero}>
                <div
                    style={{
                        ...styles.heroContent,
                        animation: loaded ? "fadeUp 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards" : "none",
                        opacity: loaded ? 1 : 0,
                    }}
                >
                    <div style={styles.heroBadge}>Handcrafted in Italy Since 1979</div>
                    <h1 style={styles.heroTitle}>
                        The Art of
                        <br />
                        <em style={styles.heroTitleEm}>Walking Well</em>
                    </h1>
                    <p style={styles.heroDesc}>Luxury driving shoes & slippers, designed in London, handmade by Italian master artisans using the finest Nappa leather and Vibram® soles.</p>
                    <div style={styles.heroCtas}>
                        <a href="#shop" style={styles.heroPrimary}>
                            Shop Collection
                        </a>
                        <a href="https://loungersway.com/pages/about-us" style={styles.heroSecondary} className="cta-btn">
                            Our Story
                        </a>
                    </div>
                </div>
                <div
                    style={{
                        ...styles.heroImageWrap,
                        animation: loaded ? "scaleIn 1.4s cubic-bezier(0.23, 1, 0.32, 1) 0.3s forwards" : "none",
                        opacity: loaded ? 1 : 0,
                    }}
                >
                    <img
                        src="https://loungersway.com/cdn/shop/products/ACCMNAP_ALL_TAN_sideview_1024x1024.jpg?v=1678185665"
                        alt="Loungers Accelerator"
                        style={styles.heroImage}
                    />
                    <div style={styles.heroImageOverlay} />
                </div>
            </section>

            {/* Features Strip */}
            <section style={styles.featureStrip}>
                {FEATURES.map((f, i) => (
                    <div
                        key={i}
                        className="feature-card"
                        style={{
                            ...styles.featureItem,
                            animation: loaded ? `fadeUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${0.2 + i * 0.15}s both` : "none",
                        }}
                    >
                        <span style={styles.featureIcon}>{f.icon}</span>
                        <span style={styles.featureTitle}>{f.title}</span>
                        <span style={styles.featureDesc}>{f.desc}</span>
                    </div>
                ))}
            </section>

            {/* Shop Section */}
            <section id="shop" style={styles.shopSection}>
                <div style={styles.shopHeader}>
                    <div>
                        <h2 style={styles.sectionTitle}>The Collection</h2>
                        <div style={styles.titleLine} />
                    </div>
                    <div style={styles.filters}>
                        {["all", "men", "women"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className="filter-btn"
                                style={{
                                    ...styles.filterBtn,
                                    color: filter === f ? "#3D2B1F" : "#A89880",
                                    borderBottom: filter === f ? "1.5px solid #3D2B1F" : "1.5px solid transparent",
                                }}
                            >
                                {f === "all" ? "All" : f === "men" ? "For Him" : "For Her"}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={styles.productGrid}>
                    {filtered.map((product, i) => (
                        <a
                            key={product.id}
                            href={product.url}
                            className="product-card"
                            style={{
                                ...styles.productCard,
                                animation: `fadeUp 0.7s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.1}s both`,
                                textDecoration: "none",
                            }}
                            onMouseEnter={() => setHoveredProduct(product.id)}
                            onMouseLeave={() => setHoveredProduct(null)}
                        >
                            <div style={styles.productImageWrap}>
                                {product.tag && <span style={styles.productTag}>{product.tag}</span>}
                                <img src={product.image} alt={product.name} className="product-img" style={styles.productImage} />
                            </div>
                            <div style={styles.productInfo}>
                                <div style={styles.productMeta}>
                                    <span style={styles.productMaterial}>{product.material}</span>
                                    <span style={styles.productColor}>{product.color}</span>
                                </div>
                                <h3 style={styles.productName}>{product.name}</h3>
                                <p style={styles.productSubtitle}>{product.subtitle}</p>
                                <div style={styles.productBottom}>
                                    <span style={styles.productPrice}>€{product.price}</span>
                                    <button
                                        className="add-btn"
                                        style={{
                                            ...styles.addBtn,
                                            opacity: hoveredProduct === product.id ? 1 : 0,
                                            transform: hoveredProduct === product.id ? "translateY(0)" : "translateY(8px)",
                                        }}
                                    >
                                        View Details →
                                    </button>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div style={styles.shopMore}>
                    <a href="https://loungersway.com/collections/all" style={styles.shopMoreBtn} className="cta-btn">
                        View All Products
                    </a>
                </div>
            </section>

            {/* Craftsmanship Story */}
            <section style={styles.storySection}>
                <div style={styles.storyGrid}>
                    <div style={styles.storyText}>
                        <span style={styles.storyLabel}>Our Craft</span>
                        <h2 style={styles.storyTitle}>
                            Where London Design
                            <br />
                            Meets Italian Mastery
                        </h2>
                        <div style={styles.storyLine} />
                        <p style={styles.storyPara}>
                            Every pair of Loungers begins with a vision in London and comes to life in the hands of Italian master craftsmen who have perfected their art over generations. Using only the finest Nappa and calfskin leathers, each shoe is hand-stitched with meticulous attention to detail.
                        </p>
                        <p style={styles.storyPara}>
                            The result is footwear that transcends the ordinary — shoes you can drive in, lounge in, travel in, and live in. With Vibram® HydroGrip soles and Sorbothane® cushioning, luxury has never felt this comfortable.
                        </p>
                        <a href="https://loungersway.com/pages/about-us" style={styles.storyLink} className="cta-btn">
                            Discover Our Story
                        </a>
                    </div>
                    <div style={styles.storyImageGrid}>
                        <div style={styles.storyImg1}>
                            <img
                                src="https://loungersway.com/cdn/shop/files/Capture_3f3baa08-9e72-470d-9f6c-656c4001ee7c_643x640.jpg?v=1637065532"
                                alt="Craftsmanship"
                                style={styles.storyImage}
                            />
                        </div>
                        <div style={styles.storyImg2}>
                            <img
                                src="https://loungersway.com/cdn/shop/files/ig_0410_73a99501-9a53-4e2f-ab85-36327407be75_651x640.jpg?v=1634287927"
                                alt="Italian Artisan"
                                style={styles.storyImage}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sustainability */}
            <section style={styles.sustainSection}>
                <div style={styles.sustainInner}>
                    <span style={styles.sustainIcon}>🌿</span>
                    <h2 style={styles.sustainTitle}>One Pair. One Tree. One Promise.</h2>
                    <p style={styles.sustainDesc}>
                        For every pair purchased, we plant a tree with Beyond Trees and protect five existing trees in the rainforest with OneTribe. Because walking well means treading lightly.
                    </p>
                    <a href="https://loungersway.com/pages/the-power-of-sustainable-choices" style={styles.sustainLink} className="cta-btn">
                        Our Commitment →
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer style={styles.footer}>
                <div style={styles.footerInner}>
                    <div style={styles.footerBrand}>
                        <span style={styles.footerLogo}>LOUNGERS</span>
                        <p style={styles.footerTagline}>Designed in London. Handmade in Italy.</p>
                    </div>
                    <div style={styles.footerCols}>
                        <div style={styles.footerCol}>
                            <h4 style={styles.footerColTitle}>Shop</h4>
                            {["Men's Collection", "Women's Collection", "Belts"].map((item) => (
                                <a key={item} href="https://loungersway.com/collections/all" style={styles.footerLink}>
                                    {item}
                                </a>
                            ))}
                        </div>
                        <div style={styles.footerCol}>
                            <h4 style={styles.footerColTitle}>Company</h4>
                            {["About Us", "Sustainability", "B2B & Franchise"].map((item) => (
                                <a key={item} href="https://loungersway.com/pages/about-us" style={styles.footerLink}>
                                    {item}
                                </a>
                            ))}
                        </div>
                        <div style={styles.footerCol}>
                            <h4 style={styles.footerColTitle}>Support</h4>
                            {["Contact", "FAQ", "Shipping", "Returns"].map((item) => (
                                <a key={item} href="https://loungersway.com/pages/contact-us" style={styles.footerLink}>
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={styles.footerBottom}>
                    <span style={styles.footerCopy}>© 2026 Loungers — Conscious Walk Ltd. London, UK</span>
                    <div style={styles.footerSocial}>
                        <a href="https://www.instagram.com/loungersway/" style={styles.footerSocialLink}>
                            Instagram
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

const styles = {
    page: {
        fontFamily: "'Outfit', sans-serif",
        background: "#FAF7F2",
        color: "#3D2B1F",
        minHeight: "100vh",
        overflowX: "hidden",
    },

    // Nav
    nav: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 40px",
        transition: "all 0.4s ease",
    },
    navInner: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: 1400,
        margin: "0 auto",
        height: 72,
    },
    navLinks: {
        display: "flex",
        gap: 32,
        flex: 1,
    },
    navLinkText: {
        fontSize: 12,
        fontWeight: 400,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: "#3D2B1F",
        textDecoration: "none",
        cursor: "pointer",
    },
    logoWrap: {
        textAlign: "center",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    logoText: {
        fontSize: 22,
        fontWeight: 300,
        letterSpacing: "6px",
        fontFamily: "'Outfit', sans-serif",
        color: "#3D2B1F",
    },
    logoSub: {
        fontSize: 9,
        letterSpacing: "3px",
        color: "#A89880",
        textTransform: "uppercase",
        marginTop: 2,
    },

    // Hero
    hero: {
        display: "flex",
        alignItems: "center",
        minHeight: "100vh",
        padding: "120px 60px 80px",
        maxWidth: 1400,
        margin: "0 auto",
        gap: 80,
    },
    heroContent: {
        flex: 1,
        maxWidth: 560,
    },
    heroBadge: {
        fontSize: 11,
        fontWeight: 400,
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        color: "#A89880",
        marginBottom: 32,
    },
    heroTitle: {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 72,
        fontWeight: 300,
        lineHeight: 1.05,
        color: "#3D2B1F",
        marginBottom: 28,
    },
    heroTitleEm: {
        fontStyle: "italic",
        fontWeight: 300,
    },
    heroDesc: {
        fontSize: 16,
        fontWeight: 300,
        lineHeight: 1.75,
        color: "#7A6B5D",
        maxWidth: 440,
        marginBottom: 40,
    },
    heroCtas: {
        display: "flex",
        gap: 24,
        alignItems: "center",
    },
    heroPrimary: {
        padding: "16px 40px",
        background: "#3D2B1F",
        color: "#FAF7F2",
        fontSize: 12,
        fontWeight: 400,
        letterSpacing: "2px",
        textTransform: "uppercase",
        textDecoration: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "'Outfit', sans-serif",
        transition: "all 0.4s ease",
    },
    heroSecondary: {
        fontSize: 12,
        fontWeight: 400,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "#3D2B1F",
        textDecoration: "none",
        cursor: "pointer",
        paddingBottom: 2,
    },
    heroImageWrap: {
        flex: 1,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    heroImage: {
        width: "100%",
        maxWidth: 520,
        objectFit: "contain",
        borderRadius: 4,
    },
    heroImageOverlay: {
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at center, transparent 40%, #FAF7F2 75%)",
        pointerEvents: "none",
    },

    // Features
    featureStrip: {
        display: "flex",
        justifyContent: "center",
        gap: 0,
        padding: "0 40px",
        maxWidth: 1200,
        margin: "0 auto",
        borderTop: "1px solid rgba(168, 152, 128, 0.2)",
        borderBottom: "1px solid rgba(168, 152, 128, 0.2)",
    },
    featureItem: {
        flex: 1,
        textAlign: "center",
        padding: "40px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        borderRight: "1px solid rgba(168, 152, 128, 0.15)",
        cursor: "default",
    },
    featureIcon: {
        fontSize: 20,
        color: "#A89880",
        marginBottom: 4,
    },
    featureTitle: {
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "0.5px",
        color: "#3D2B1F",
    },
    featureDesc: {
        fontSize: 12,
        fontWeight: 300,
        color: "#A89880",
    },

    // Shop
    shopSection: {
        padding: "100px 40px",
        maxWidth: 1400,
        margin: "0 auto",
    },
    shopHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 60,
    },
    sectionTitle: {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 42,
        fontWeight: 300,
        color: "#3D2B1F",
    },
    titleLine: {
        width: 60,
        height: 1,
        background: "#C8B8A0",
        marginTop: 16,
    },
    filters: {
        display: "flex",
        gap: 28,
    },
    filterBtn: {
        background: "none",
        border: "none",
        fontSize: 12,
        fontWeight: 400,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        cursor: "pointer",
        padding: "4px 0",
        fontFamily: "'Outfit', sans-serif",
    },
    productGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 32,
    },
    productCard: {
        background: "#FFFFFF",
        borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid rgba(200, 184, 160, 0.15)",
    },
    productImageWrap: {
        position: "relative",
        background: "#F5F0EA",
        padding: "32px 24px",
        overflow: "hidden",
        aspectRatio: "4/3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    productTag: {
        position: "absolute",
        top: 16,
        left: 16,
        fontSize: 10,
        fontWeight: 400,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: "#3D2B1F",
        background: "rgba(250, 247, 242, 0.9)",
        padding: "5px 12px",
        borderRadius: 2,
        zIndex: 2,
    },
    productImage: {
        width: "85%",
        height: "100%",
        objectFit: "contain",
    },
    productInfo: {
        padding: "20px 24px 24px",
    },
    productMeta: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    productMaterial: {
        fontSize: 10,
        fontWeight: 400,
        letterSpacing: "1px",
        textTransform: "uppercase",
        color: "#A89880",
    },
    productColor: {
        fontSize: 10,
        fontWeight: 400,
        letterSpacing: "1px",
        textTransform: "uppercase",
        color: "#A89880",
    },
    productName: {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 22,
        fontWeight: 400,
        color: "#3D2B1F",
        marginBottom: 2,
    },
    productSubtitle: {
        fontSize: 13,
        fontWeight: 300,
        color: "#7A6B5D",
        marginBottom: 16,
    },
    productBottom: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 400,
        color: "#3D2B1F",
        letterSpacing: "0.5px",
    },
    addBtn: {
        background: "transparent",
        border: "1px solid #3D2B1F",
        color: "#3D2B1F",
        padding: "8px 20px",
        fontSize: 10,
        fontWeight: 400,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        cursor: "pointer",
        fontFamily: "'Outfit', sans-serif",
        transition: "all 0.35s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s ease, transform 0.3s ease",
    },
    shopMore: {
        textAlign: "center",
        marginTop: 60,
    },
    shopMoreBtn: {
        fontSize: 12,
        fontWeight: 400,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "#3D2B1F",
        textDecoration: "none",
        paddingBottom: 4,
    },

    // Story
    storySection: {
        padding: "100px 40px",
        background: "#FFFFFF",
    },
    storyGrid: {
        display: "flex",
        gap: 80,
        maxWidth: 1200,
        margin: "0 auto",
        alignItems: "center",
    },
    storyText: {
        flex: 1,
    },
    storyLabel: {
        fontSize: 11,
        fontWeight: 400,
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        color: "#A89880",
        display: "block",
        marginBottom: 20,
    },
    storyTitle: {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 38,
        fontWeight: 300,
        lineHeight: 1.2,
        color: "#3D2B1F",
        marginBottom: 24,
    },
    storyLine: {
        width: 50,
        height: 1,
        background: "#C8B8A0",
        marginBottom: 28,
    },
    storyPara: {
        fontSize: 15,
        fontWeight: 300,
        lineHeight: 1.8,
        color: "#7A6B5D",
        marginBottom: 20,
    },
    storyLink: {
        fontSize: 12,
        fontWeight: 400,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "#3D2B1F",
        textDecoration: "none",
        paddingBottom: 4,
        marginTop: 12,
        display: "inline-block",
    },
    storyImageGrid: {
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
    },
    storyImg1: {
        borderRadius: 4,
        overflow: "hidden",
        aspectRatio: "3/4",
    },
    storyImg2: {
        borderRadius: 4,
        overflow: "hidden",
        aspectRatio: "3/4",
        marginTop: 40,
    },
    storyImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },

    // Sustainability
    sustainSection: {
        padding: "100px 40px",
        background: "#F5F0EA",
    },
    sustainInner: {
        maxWidth: 680,
        margin: "0 auto",
        textAlign: "center",
    },
    sustainIcon: {
        fontSize: 28,
        display: "block",
        marginBottom: 20,
    },
    sustainTitle: {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 36,
        fontWeight: 300,
        color: "#3D2B1F",
        marginBottom: 20,
    },
    sustainDesc: {
        fontSize: 15,
        fontWeight: 300,
        lineHeight: 1.8,
        color: "#7A6B5D",
        marginBottom: 32,
    },
    sustainLink: {
        fontSize: 12,
        fontWeight: 400,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "#3D2B1F",
        textDecoration: "none",
        paddingBottom: 4,
    },

    // Footer
    footer: {
        padding: "80px 40px 40px",
        background: "#3D2B1F",
        color: "#C8B8A0",
    },
    footerInner: {
        display: "flex",
        justifyContent: "space-between",
        maxWidth: 1200,
        margin: "0 auto",
        paddingBottom: 60,
        borderBottom: "1px solid rgba(200, 184, 160, 0.15)",
    },
    footerBrand: {},
    footerLogo: {
        fontSize: 20,
        fontWeight: 300,
        letterSpacing: "5px",
        color: "#FAF7F2",
        display: "block",
        marginBottom: 8,
    },
    footerTagline: {
        fontSize: 12,
        fontWeight: 300,
        color: "#A89880",
    },
    footerCols: {
        display: "flex",
        gap: 80,
    },
    footerCol: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
    },
    footerColTitle: {
        fontSize: 11,
        fontWeight: 400,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: "#FAF7F2",
        marginBottom: 8,
    },
    footerLink: {
        fontSize: 13,
        fontWeight: 300,
        color: "#A89880",
        textDecoration: "none",
        transition: "color 0.3s ease",
    },
    footerBottom: {
        display: "flex",
        justifyContent: "space-between",
        maxWidth: 1200,
        margin: "0 auto",
        paddingTop: 28,
    },
    footerCopy: {
        fontSize: 11,
        fontWeight: 300,
        color: "#7A6B5D",
    },
    footerSocial: {
        display: "flex",
        gap: 24,
    },
    footerSocialLink: {
        fontSize: 12,
        fontWeight: 300,
        color: "#A89880",
        textDecoration: "none",
        letterSpacing: "1px",
    },
};