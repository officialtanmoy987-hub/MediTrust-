import { Doctor, Product, Symptom } from './types';

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: "doc1",
    name: "Dr. Sarah Wilson",
    specialty: "MD, Homeopathy Specialist",
    experience: "12+ Years Experience",
    availability: "Available Tomorrow",
    fee: 800,
    rating: 4.9,
    badge: "Top Rated",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhYbLQyf9M53XqS266O0A6CZyFAlmvvgxASJjfNIRYSqjl2iDXt2KW8l1dLxf95kDBef6a4NcSMtccXspu2IXPY0nYM78LqD_DFlVwYauaHQhj3KLLjfBFLhD2l0hMYzHoYxgq7axd7KsHRJbV-l6EkjIs7eOw5cZrRXen_KUCKKviCTZ9TzpnP_MhZOSkqNdnKwCckWdXO06o7cS1vEacLfu8TkfeWndpmnlzdRqZHdJUY__XEUDhSpIH96f9GDcgRPXDpFxibWM"
  },
  {
    id: "doc2",
    name: "Dr. James Carter",
    specialty: "MBBS, Pediatrics Specialist",
    experience: "15+ Years Experience",
    availability: "Next: Wed, 10 AM",
    fee: 1200,
    rating: 4.8,
    badge: "Expert",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBPDx7uiB0Ev8L-wVosy_7diD3C4aIHYoITxkdF5ZnBMgjibXucGDmp3SJstJZQHREagQS2297ouE3p2fFdT4OAIm8YkPR8DLFOj1ucuZn2q52YzWqfiWvtdXtf4V3QXZr-m5SP6t8W_gKdyb3Jy393TWlLtIzAXeSXusixKv_OhlZezskSeMVWgNBW4VvzAPz501LV3LmBx77W1_Qj8_T5zEi-n3LNQ-8M1Da6yq5DTuQwXkV3HHRMlD1CQomJc3HqpRCY9YCrjU"
  },
  {
    id: "doc3",
    name: "Dr. Anita Desai",
    specialty: "MD, General Medicine",
    experience: "8+ Years Experience",
    availability: "Available Today",
    fee: 500,
    rating: 5.0,
    badge: "Patient Choice",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBupkk7-Ne0wByUwf9xrcADd2TEhhAroyzJpLq_gtT4kopWYRRwqcdAwqMYiBJsMBp8vJg7d0bvMlRMdX_apj3VGMVQ3Bi6DqjZ037GK618uxqTN34zFMraMfotLccygAYnncJdqo2n7ROx0HL2eWe6-_Jq6biowPUs2vKwxMtopebYzru77kfFXc1ev49M14-YFPk8TG-ovggk01mUfbc3BP861XnTKIJENKG0JuwR3okJGmBIUHgyo0Q8JLgUtJSLNVUB1P22pH0"
  },
  {
    id: "doc4",
    name: "Dr. Michael Reed",
    specialty: "MS, Cardiology Specialist",
    experience: "20+ Years Experience",
    availability: "Next: Mon, 9 AM",
    fee: 1500,
    rating: 4.7,
    badge: "Popular",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwwGfo9MU9Pcb1x8BU4HxEBH7XH0LN7PgmVg7gRNEg6vl4gzehxPMDiTvLryITUVhvYBoSrVHPjqdhlomphLNZwAKS6OLxEKRq2D1HyQCBRhu9fSvxDL2Mx4gZ2TDfGWjzfc_B6p2pmoiVR-ZVLkA3wS3md95JBtRk9bpBj6HJLnosnpXk9iA9K7GjUD9qbFq6rlHc7WPm4FSa20m-1b4xHWimdeMf9kf-qtlyiqsYroElYbavzBnZVFraD2oX1YQdOIsPkDVLKoQ"
  },
  {
    id: "doc5",
    name: "Dr. Priya Sharma",
    specialty: "MD, Dermatology Specialist",
    experience: "6+ Years Experience",
    availability: "Available Today",
    fee: 750,
    rating: 4.9,
    badge: "New Star",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfUTAdK2IEPZ2PDt9bYOtd_0cvlDownEDVfZzwmhunx0uYS0DO3HNva5EdIrNWmH7zlxi2Ja95r5b52rxAz9gGRUcnR0l_-zJ6nWex87aq5jmB307aEgW6nSVmaxMh0JtUpg1Kry7SPcHYJRdZ4EFrUetxvB5c5LGoqgh6rCY2XY-Uca3FXJO_5sCuaZkxW_okg7tRyB19ByuSGbTk9awUZEaA7j6Sji6BLHZLsrp8P5s8i752KWwHf3YZkQez66QGsmMMeZ5559s"
  },
  {
    id: "doc6",
    name: "Dr. David Cohen",
    specialty: "MD, Neurology Specialist",
    experience: "18+ Years Experience",
    availability: "Next: Tue, 11 AM",
    fee: 2000,
    rating: 4.8,
    badge: "Expert",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLFGxxZqk5D1L8JKTjEU5mg_mwMhXBXmReHAICE3aXY0FjR5n29L5GILysJvYIwVbLfyp1Cv1q2F6DhrKlHA_kSHPdxxmjdzfMkAm9zEjFF6x9T7XQyr5wcyS7m7rHVMSgnBn44dtI_vp3ueGYqrKFIcpgAIvG0bce4uXwUUPbgm-6hehLiSOJMubnq0qoY0-LjONKpBqoxEVzplD_ouHri7_1hWkiCyiPNxkXF4HDk9N40O9imvfCKnLwTXRpGz2BMRVWHCI6dHo"
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Organic Tulsi Immunity drops",
    price: 499,
    originalPrice: 599,
    rating: "4.8 (1.2k)",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAluV3T9jrZeGzNevAiUxL4UoLsLxnm_pl52P3AEFTGndA5BWpJiOzgceyhZUJFo--VtuQWWMhQ2cpB0UpVt8z0l2AGWV7A0n4pgm4wb6pyjda8i5m0HKg8kDg2NJ5CV4mw80TCbSwXxnUtHrCHf1l-Is7PLLbyyLSbMfUXn1HpnJGUE8-ttiF93rW8Efs3LAIDpk_HCFoWiGRMqrUc7-gc7KN3rko_WOCYCC7yoiZy3yZg7WpjnhsdV6vVYtb3gPxvCEqVILVPtJw",
    category: "immunity",
    type: "homeopathic"
  },
  {
    id: "p2",
    name: "Honey-Based Cough Relief 200ml",
    price: 245,
    originalPrice: 280,
    rating: "4.9 (840)",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAo9J8EIWJOT9DuUjVz7jfUcM18hCXbb20U-ykWxbH_wUpgEzYsBAMrF9Dsj6TGq9kClrH4iTWtsSwCaCMxUj3chzlOM5l1glseTn5LGdNStz-HZKwGxKTYOeuzpzNwLl66PaNqJEIe6XR6jicLy9LqcroKnXcpuGsWOxmsmAFShsp27GCeKNe5LWyladb6qIosnYcS89x7n2jIq_dvxeqn81hokHjvi__Yk41TJmuxjfxkKrogCwOLr7xYM3ZNDTzQsgiYKgcxQy4",
    category: "cold_cough",
    type: "homeopathic"
  },
  {
    id: "p3",
    name: "Digestive Enzymes Pro-Pack",
    price: 650,
    originalPrice: 750,
    rating: "4.7 (520)",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCczFFPqW0piHnBvdzzR9TWbAR31eU88qK5GoFIrEqmIios_BzpQnK5lSdIxThJOrVX66SFdIsPEjPGNZcFRJkeJmi90siMrtWaPPZycvSBiR3kYt3hb_fFQosL_TmD-ZJzpLoevJRMmL_7Dph7Wx4y6mY0w1RGucTk8ElFJry7enS5lucbibDOGmCAfsdaZ6p8E9ogG4CXxLpHbvoHCk7ywPfwBZZjb-zGB12nUC-TPlcvH-OaDItwV1o79Rmv8gCqGdjg2IlVwR8",
    category: "digestion",
    type: "general"
  },
  {
    id: "p4",
    name: "Ashwagandha Vitality Capsules",
    price: 890,
    originalPrice: 1100,
    rating: "4.6 (98)",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBA5iLHeQarCCbq4f_sd2_Qlt2k5gmJrmFsIPf3bkkgSwFoPFfZad1nbzlEXeF_X3klTj8rjau7sOmRtXfcEgHktPlQ_i0awCZVSHQYQN3y_BkE-jSsjIpIgnvYsZ4iiy2JQvPbrk3mbZAElwQ3m5sTFx897pQ8olegEta3_Xt1xLneKpylLvi3OPNTrasUDBEDACUVL4IN7eZertsYw5yYDkvhySQCc0Z5kv_JNgtIPod63ZvCvLsTWn4bK3AJoUC8dVc0U5H1Fjk",
    category: "wellness",
    type: "homeopathic"
  },
  {
    id: "p5",
    name: "Heart Care Omega-3 Premium",
    price: 1200,
    originalPrice: 1450,
    rating: "4.8 (340)",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBA5iLHeQarCCbq4f_sd2_Qlt2k5gmJrmFsIPf3bkkgSwFoPFfZad1nbzlEXeF_X3klTj8rjau7sOmRtXfcEgHktPlQ_i0awCZVSHQYQN3y_BkE-jSsjIpIgnvYsZ4iiy2JQvPbrk3mbZAElwQ3m5sTFx897pQ8olegEta3_Xt1xLneKpylLvi3OPNTrasUDBEDACUVL4IN7eZertsYw5yYDkvhySQCc0Z5kv_JNgtIPod63ZvCvLsTWn4bK3AJoUC8dVc0U5H1Fjk",
    category: "heart_care",
    type: "general"
  }
];

export const POPULAR_SYMPTOMS: Symptom[] = [
  { id: "sym1", label: "Fever", iconName: "Thermometer" },
  { id: "sym2", label: "Cough", iconName: "Wind" },
  { id: "sym3", label: "Headache", iconName: "Activity" },
  { id: "sym4", label: "Nausea", iconName: "Layers" },
  { id: "sym5", label: "Fatigue", iconName: "BatteryLow" },
  { id: "sym6", label: "Dizziness", iconName: "Compass" },
  { id: "sym7", label: "Chest Pain", iconName: "Heart" }
];
