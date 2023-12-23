// Assigns an image against a value for conditional rendering on cards

export default function getValueImage(nominationValue) {
    const value =
      nominationValue && nominationValue.length > 0 ? nominationValue[0] : null;

    switch (value) {
      case "Say/Do":
        return "https://storage.googleapis.com/weppreciate-store/award/anima_panda.png";
      case "Commitment":
        return "https://storage.googleapis.com/weppreciate-store/award/anima_cat.png";
      case "Collaborate":
        return "https://storage.googleapis.com/weppreciate-store/award/anima_llama.png";
      case "Challenging":
        return "https://storage.googleapis.com/weppreciate-store/award/anima_meer.png";
      case "Learning":
        return "https://storage.googleapis.com/weppreciate-store/award/anima_rabbit.png";
      case "Spirited":
        return "https://storage.googleapis.com/weppreciate-store/award/anima_quokka.png";
      default:
        return "https://storage.googleapis.com/weppreciate-store/award/anima_flamingo.png";
    }
  }