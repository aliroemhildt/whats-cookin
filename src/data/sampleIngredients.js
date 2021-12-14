const sampleIngredients = [
  {
    "id": 20081,
    "name": "wheat flour",
    "estimatedCostInCents": 142
  },
  {
    "id": 18372,
    "name": "bicarbonate of soda",
    "estimatedCostInCents": 582
  },
  {
    "id": 1123,
    "name": "eggs",
    "estimatedCostInCents": 472
  },
  {
    "id": 19335,
    "name": "sucrose",
    "estimatedCostInCents": 902
  },
  {
    "id": 19206,
    "name": "instant vanilla pudding",
    "estimatedCostInCents": 660
  },
  {
    "id": 19334,
    "name": "brown sugar",
    "estimatedCostInCents": 559
  },
  {
    "id": 2047,
    "name": "salt",
    "estimatedCostInCents": 280
  },
  {
    "id": 1012047,
    "name": "fine sea salt",
    "estimatedCostInCents": 528
  },
  {
    "id": 10019903,
    "name": "semi sweet chips",
    "estimatedCostInCents": 253
  },
  {
    "id": 1145,
    "name": "unsalted butter",
    "estimatedCostInCents": 617
  },
  {
    "id": 2050,
    "name": "vanilla",
    "estimatedCostInCents": 926
  },
  {
    "id": 1009016,
    "name": "apple cider",
    "estimatedCostInCents": 468
  },
  {
    "id": 9003,
    "name": "apple",
    "estimatedCostInCents": 207
  },
  {
    "id": 20027,
    "name": "corn starch",
    "estimatedCostInCents": 236
  },
  {
    "id": 1002046,
    "name": "dijon style mustard",
    "estimatedCostInCents": 619
  },
  {
    "id": 11215,
    "name": "whole garlic clove",
    "estimatedCostInCents": 220
  },
  {
    "id": 1012046,
    "name": "whole grain dijon mustard",
    "estimatedCostInCents": 867
  },
  {
    "id": 19911,
    "name": "maple",
    "estimatedCostInCents": 349
  },
  {
    "id": 16112,
    "name": "miso",
    "estimatedCostInCents": 978
  },
  {
    "id": 10010062,
    "name": "pork chop",
    "estimatedCostInCents": 834
  },
  {
    "id": 1102047,
    "name": "s&p",
    "estimatedCostInCents": 524
  },
  {
    "id": 16124,
    "name": "soy sauce",
    "estimatedCostInCents": 486
  },
  {
    "id": 1016168,
    "name": "sriracha sauce",
    "estimatedCostInCents": 576
  },
  {
    "id": 1002030,
    "name": "black pepper",
    "estimatedCostInCents": 441
  },
  {
    "id": 1001,
    "name": "butter",
    "estimatedCostInCents": 618
  },
  {
    "id": 4582,
    "name": "oil",
    "estimatedCostInCents": 807
  },
  {
    "id": 2031,
    "name": "red pepper powder",
    "estimatedCostInCents": 583
  },
  {
    "id": 5100,
    "name": "chicken wing",
    "estimatedCostInCents": 593
  },
  {
    "id": 2009,
    "name": "red chili powder",
    "estimatedCostInCents": 499
  },
  {
    "id": 1022020,
    "name": "garlic powder",
    "estimatedCostInCents": 344
  },
  {
    "id": 6168,
    "name": "tabasco sauce",
    "estimatedCostInCents": 859
  },
  {
    "id": 9176,
    "name": "mangoes",
    "estimatedCostInCents": 425
  },
  {
    "id": 2026,
    "name": "onion powder",
    "estimatedCostInCents": 597
  },
  {
    "id": 1042047,
    "name": "seasoned salt",
    "estimatedCostInCents": 334
  },
  {
    "id": 18371,
    "name": "baking powder",
    "estimatedCostInCents": 346
  },
  {
    "id": 9040,
    "name": "ripe banana",
    "estimatedCostInCents": 331
  },
  {
    "id": 20011,
    "name": "buck wheat flour",
    "estimatedCostInCents": 865
  },
  {
    "id": 1230,
    "name": "buttermilk",
    "estimatedCostInCents": 773
  },
  {
    "id": 19296,
    "name": "runny honey",
    "estimatedCostInCents": 742
  },
  {
    "id": 16098,
    "name": "peanut butter",
    "estimatedCostInCents": 490
  },
  {
    "id": 2048,
    "name": "apple cider vinegar",
    "estimatedCostInCents": 532
  },
  {
    "id": 20090,
    "name": "brown rice flour",
    "estimatedCostInCents": 667
  },
  {
    "id": 93784,
    "name": "brown rice syrup",
    "estimatedCostInCents": 126
  },
  {
    "id": 1124,
    "name": "egg albumen",
    "estimatedCostInCents": 304
  },
  {
    "id": 93625,
    "name": "evaporated cane juice",
    "estimatedCostInCents": 118
  },
  {
    "id": 12220,
    "name": "flax meal",
    "estimatedCostInCents": 296
  },
  {
    "id": 10118375,
    "name": "instant yeast",
    "estimatedCostInCents": 383
  },
  {
    "id": 19304,
    "name": "unsulfured molasses",
    "estimatedCostInCents": 925
  },
  {
    "id": 11413,
    "name": "Potato Starch Flour",
    "estimatedCostInCents": 895
  },
  {
    "id": 93696,
    "name": "tapioca starch",
    "estimatedCostInCents": 656
  },
  {
    "id": 93760,
    "name": "Whole Grain Teff Flour",
    "estimatedCostInCents": 539
  },
  {
    "id": 14412,
    "name": "ice water",
    "estimatedCostInCents": 625
  },
  {
    "id": 93626,
    "name": "xanthan gum",
    "estimatedCostInCents": 625
  },
  {
    "id": 19350,
    "name": "corn syrup",
    "estimatedCostInCents": 441
  },
  {
    "id": 9099,
    "name": "fruit cocktail",
    "estimatedCostInCents": 953
  },
  {
    "id": 12061,
    "name": "whole almonds",
    "estimatedCostInCents": 1029
  },
  {
    "id": 12104,
    "name": "coconut",
    "estimatedCostInCents": 918
  },
  {
    "id": 12115,
    "name": "coconut cream",
    "estimatedCostInCents": 304
  },
  {
    "id": 4047,
    "name": "coconut oil",
    "estimatedCostInCents": 152
  },
  {
    "id": 10019071,
    "name": "dark chocolate morsels",
    "estimatedCostInCents": 632
  },
  {
    "id": 8212,
    "name": "granola cereal",
    "estimatedCostInCents": 381
  },
  {
    "id": 8121,
    "name": "oatmeal",
    "estimatedCostInCents": 659
  },
  {
    "id": 12142,
    "name": "pecan",
    "estimatedCostInCents": 314
  },
  {
    "id": 93740,
    "name": "blanched almond flour",
    "estimatedCostInCents": 986
  },
  {
    "id": 1125,
    "name": "egg yolks",
    "estimatedCostInCents": 889
  },
  {
    "id": 12023,
    "name": "sesame seeds",
    "estimatedCostInCents": 886
  },
  {
    "id": 1015062,
    "name": "chicken tenders",
    "estimatedCostInCents": 657
  },
  {
    "id": 10011109,
    "name": "slaw mix",
    "estimatedCostInCents": 681
  },
  {
    "id": 10116098,
    "name": "creamy peanut butter",
    "estimatedCostInCents": 152
  },
  {
    "id": 2064,
    "name": "mint",
    "estimatedCostInCents": 575
  },
  {
    "id": 2021,
    "name": "powdered ginger",
    "estimatedCostInCents": 783
  },
  {
    "id": 9160,
    "name": "juice of lime",
    "estimatedCostInCents": 477
  },
  {
    "id": 9266,
    "name": "pineapple",
    "estimatedCostInCents": 834
  },
  {
    "id": 11135,
    "name": "cauliflower",
    "estimatedCostInCents": 486
  },
  {
    "id": 6172,
    "name": "chicken stock",
    "estimatedCostInCents": 454
  },
  {
    "id": 93632,
    "name": "ghee",
    "estimatedCostInCents": 370
  },
  {
    "id": 12120,
    "name": "hazelnut",
    "estimatedCostInCents": 812
  },
  {
    "id": 93690,
    "name": "nutritional yeast flakes",
    "estimatedCostInCents": 969
  },
  {
    "id": 11282,
    "name": "onions",
    "estimatedCostInCents": 439
  },
  {
    "id": 10010123,
    "name": "proscuitto",
    "estimatedCostInCents": 217
  },
  {
    "id": 11096,
    "name": "rapini",
    "estimatedCostInCents": 846
  }
]


export default sampleIngredients;
