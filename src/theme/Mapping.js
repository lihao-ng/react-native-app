import { Spacing } from '../styles';
import { fonts, fontSizes, sizes } from './Variables';

const mapping = {
  "strict": {
    "text-font-family": fonts.p1,
    "text-heading-1-font-family": fonts.h1,
    "text-heading-2-font-family": fonts.h2,
    "text-subtitle-1-font-family": fonts.s1,
    "text-subtitle-2-font-family": fonts.s2,
    "text-caption-1-font-family": fonts.c1,
    "text-paragraph-2-font-family": fonts.p2,
    "text-heading-1-font-size": fontSizes.h1,
    "text-heading-2-font-size": fontSizes.h2,
    "text-subtitle-1-font-size": fontSizes.s1,
    "text-subtitle-2-font-size": fontSizes.s2,
    "text-paragraph-1-font-size": fontSizes.p1,
    "text-paragraph-1-font-size": fontSizes.p2,
    "text-caption-1-font-size": fontSizes.c1
  },
  "components": {
    "Layout": {
      "meta": {},
      "appearances": {
        "default": {
          "mapping": {},
          "variantGroups": {
              "level": {
                "2": {
                  "backgroundColor": "color-danger-500"
                },
                "3": {
                  "backgroundColor": "white"
                }
              }
          }
        }
      }
    },
    "Text": {
      "meta": {},
      "appearances": {
        "default": {
          "variantGroups": {
            "status": {
              "danger": {
                "color": "color-danger-500"
              },
              "info": {
                "color": "text-hint-color"
              },
              "control": {
                "color": "white"
              }
            }
          }
        }
      }
    },
    "Button": {
      "meta": {},
      "appearances": {
        "filled": {
          "variantGroups": {
            // "status": {
              // "primary": {
              //   "backgroundColor": "secondary-color",
              //   "borderColor": "secondary-color",
              //   "textColor": "white"
              // }
            // },
            "size": {
              "medium": {
                "borderRadius": 8,
                "paddingHorizontal": sizes.xl,
              }
            }
          }
        }
      }
    },
    "TopNavigation": {
      "meta": {},
      "appearances": {
        "default": {
          "mapping": {
            "backgroundColor": "white"
          }
        }
      }
  },
    "BottomNavigation": {
      "meta": {},
      "appearances": {
        "noIndicator": {
          "mapping": {
            "backgroundColor": "white"
          }
        }
      }
    },
    "BottomNavigationTab": {
      "meta": {},
      "appearances": {
        "default": {
          "mapping": {
            "state": {
              "selected": {
                "textColor": "black"
              }
            }
          }
        }
      }
    },
    "Input": {
      "meta": {},
      "appearances": {
        "default": {
          "variantGroups": {
            "status": {
              "basic": {
                "borderColor": "transparent",
                "backgroundColor": "white",
                "textColor": "text-basic-color",
                "state": {
                  "focused": {
                    "borderColor": "transparent",
                    "backgroundColor": "white",
                    "iconTintColor": "text-hint-color"
                  },
                  "hover": {
                    "borderColor": "transparent",
                    "backgroundColor": "white"
                  },
                  "disabled": {
                    "borderColor": "border-basic-color-4",
                    "backgroundColor": "border-basic-color-4"
                  }
                }
              }
            }
          }
        }
      }
    },
    "Card": {
      "meta": {},
      "appearances": {
        "outline": {
          "mapping": {
            "backgroundColor": "white"
          }
        }
      }
    },
    "Select": {
      "meta": {},
      "appearances": {
        "default": {
          "variantGroups": {
            "status": {
              "basic": {
                "textFontSize": fontSizes.p1,
                "textFontFamily": fonts.p1,
                "borderColor": "grey",
                "backgroundColor": "white",
                "state": {
                  "focused": {
                    "borderColor": "grey",
                    "backgroundColor": "white"
                  },
                  "hover": {
                    "borderColor": "grey",
                    "backgroundColor": "white"
                  },
                  "active": {
                    "borderColor": "grey",
                    "backgroundColor": "white"
                  },
                }
              }
            }
          }
        }
      }
    },
    "SelectOption": {
      "meta": {},
      "appearances": {
        "default": {
          "mapping": {
            "backgroundColor": "white",
            "state": {
              "hover": {
                  "backgroundColor": "color-primary-500",
                  "textColor": "white"
              },
              "selected": {
                  "backgroundColor": "color-primary-500",
                  "textColor": "white"
              }
            }
          }
        }
      }
    },
    "Divider": {
      "meta": {},
      "appearances": {
        "default": {
          "mapping": {
            "backgroundColor": "grey"
          }
        }
      }
    }
  }
};

export { mapping };