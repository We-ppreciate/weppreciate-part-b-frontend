export default function getValueColor(nominationValue) {
    const value =
      nominationValue && nominationValue.length > 0 ? nominationValue[0] : null;

    switch (value) {
      case "Say/Do":
        return "#E9DFB7";
      case "Commitment":
        return "#CB9EAF";
      case "Collaborate":
        return "#A6B5BE";
      case "Challenging":
        return "#BDD3D0";
      case "Learning":
        return "#C1D8C5";
      case "Spirited":
        return "#E9B682";
      default:
        return "#0B4EA2";
    }
  }