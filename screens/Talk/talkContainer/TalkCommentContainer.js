import React, { useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  TouchableWithoutFeedback,
} from "react-native";
import contents from "../../../contents";
import styles from "../../../styles";
import moment from "moment";
import {
  TALK_COMMENT_EDIT,
  SEE_TALK,
  TALK_COMMENT_DELETE,
} from "../talkQueries";
import { useMutation } from "react-apollo-hooks";
import Textarea from "react-native-textarea";
import Modal from "react-native-modal";
import ModalButton from "../../../components/ModalButton";
import Loader from "../../../components/Loader";
import TalkRepplyContainer from "./TalkRepplyContainer";

const TalkCommentContainer = ({
  user,
  createdAt,
  text,
  seeMe,
  id,
  talkId,
  talkRepplies,
  commentModalVisible,
  setCommentModalVisible,
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(text);
  const [commentModifyVisible, setCommentModifyVisible] = useState(false);
  const [commentDeleteVisible, setCommentDeleteVisible] = useState(false);
  const a = moment();
  const b = moment(createdAt);

  const minuteCreated = a.diff(b, "minutes"); // 44700
  const hourCreated = a.diff(b, "hours"); // 745
  const dayCreated = a.diff(b, "days"); // 31
  const weekCreated = a.diff(b, "weeks"); // 4
  const monthCreated = a.diff(b, "months");
  const yearCreated = a.diff(b, "years");

  const onChange = (text) => {
    setValue(text);
  };

  const myCommentVerify =
    String(user && user.id) === String(seeMe && seeMe.me && seeMe.me.id);

  const [talkCommentEditMutation] = useMutation(TALK_COMMENT_EDIT, {
    variables: {
      talkCommentId: id,
      text: value,
    },
    refetchQueries: () => [{ query: SEE_TALK }],
    awaitRefetchQueries: true,
  });

  const [talkCommentDeleteMutation] = useMutation(TALK_COMMENT_DELETE, {
    variables: {
      talkCommentId: id,
    },
    refetchQueries: () => [{ query: SEE_TALK }],
    awaitRefetchQueries: true,
  });

  const commentModifyHandle = async () => {
    if (value) {
      setIsLoading(true);
      await talkCommentEditMutation();
      setIsLoading(false);
      setCommentModifyVisible(!commentModifyVisible);
    } else {
      ToastAndroid.show("????????? ??????????????????", ToastAndroid.SHORT);
    }
  };

  const commentDeleteHandle = async () => {
    setIsLoading(true);
    await talkCommentDeleteMutation();
    setIsLoading(false);
    setCommentDeleteVisible(!commentDeleteVisible);
  };

  const me = seeMe && seeMe.me;

  return (
    <View
      key={id}
      style={{
        paddingLeft: 30,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: styles.lightGreyColor,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setCommentModalVisible(!commentModalVisible);
            navigation.navigate("SoulerProfile", {
              userId: user && user.id,
              me: me,
            });
          }}
        >
          <Image
            source={
              user && user.avatar
                ? { uri: user.avatar }
                : require("../../../assets/noAvatar.png")
            }
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableWithoutFeedback>
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: contents.width / 1.3,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                marginLeft: 10,
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: styles.darkGreyColor,
                  fontWeight: "700",
                }}
              >
                {user && user.nickname}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 10,
                  color: styles.darkGreyColor,
                  fontWeight: "700",
                }}
              >
                /
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 10,
                  color: styles.darkGreyColor,
                  fontWeight: "700",
                }}
              >
                {minuteCreated < 60
                  ? `${minuteCreated}??? ???`
                  : hourCreated < 24
                  ? `${hourCreated}?????? ???`
                  : dayCreated < 7
                  ? `${dayCreated}??? ???`
                  : weekCreated < 5
                  ? `${weekCreated}??? ???`
                  : monthCreated < 12
                  ? `${monthCreated}?????? ???`
                  : `${yearCreated}??? ???`}
              </Text>
            </View>
            <View style={{ marginBottom: 10, marginLeft: 10, marginTop: 5 }}>
              {myCommentVerify ? (
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    disabled={isLoading}
                    onPress={() =>
                      setCommentDeleteVisible(!commentDeleteVisible)
                    }
                  >
                    <View
                      style={{ width: 30, height: 20, alignItems: "center" }}
                    >
                      <Text
                        style={{ fontSize: 10, color: styles.darkGreyColor }}
                      >
                        ??????
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={isLoading}
                    style={{ marginLeft: 10 }}
                    onPress={() =>
                      setCommentModifyVisible(!commentModifyVisible)
                    }
                  >
                    <View
                      style={{ width: 30, height: 20, alignItems: "center" }}
                    >
                      <Text
                        style={{ fontSize: 10, color: styles.darkGreyColor }}
                      >
                        ??????
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>
          <Text
            style={{
              marginLeft: 20,
              width: contents.width / 1.5,
            }}
          >
            {text}
          </Text>
        </View>
        <TalkRepplyContainer
          commentModalVisible={commentModalVisible}
          setCommentModalVisible={setCommentModalVisible}
          user={user}
          createdAt={createdAt}
          text={text}
          seeMe={seeMe}
          id={id}
          commentModalVisible={commentModalVisible}
          setCommentModalVisible={setCommentModalVisible}
          talkId={talkId}
          talkRepplies={talkRepplies}
          navigation={navigation}
        />
      </View>
      <Modal
        isVisible={commentModifyVisible}
        onBackdropPress={() =>
          isLoading ? null : setCommentModifyVisible(!commentModifyVisible)
        }
        onRequestClose={() =>
          isLoading ? null : setCommentModifyVisible(!commentModifyVisible)
        }
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              backgroundColor: styles.BlueSky,
              alignItems: "center",
              width: 300,
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: "700" }}>?????? ??????</Text>
            </View>
            <Textarea
              autoFocus={true}
              defaultValue={value}
              onChangeText={onChange}
              containerStyle={{
                height: contents.height / 5,
                width: contents.width / 1.65,
                padding: 5,
                backgroundColor: styles.moreLightGrey,
                borderRadius: 10,
              }}
              style={{
                textAlignVertical: "top", // hack android
                height: contents.height / 5,
                fontSize: 14,
                color: "#333",
                padding: 10,
              }}
              placeholderTextColor={"#c7c7c7"}
              underlineColorAndroid={"transparent"}
              editable={!isLoading}
            />
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ marginRight: 10 }}>
                <ModalButton
                  text={"??????"}
                  onPress={() => setCommentModifyVisible(!commentModifyVisible)}
                  backColor={"white"}
                  textColor={"black"}
                  disabled={isLoading}
                />
              </View>
              <View>
                <ModalButton
                  text={"??????"}
                  onPress={() => commentModifyHandle()}
                  backColor={"white"}
                  textColor={"black"}
                  disabled={isLoading}
                  isLoading={isLoading}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={commentDeleteVisible}
        onBackdropPress={() =>
          isLoading ? null : setCommentDeleteVisible(!commentDeleteVisible)
        }
        onRequestClose={() =>
          isLoading ? null : setCommentDeleteVisible(!commentDeleteVisible)
        }
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              backgroundColor: "white",
              alignItems: "center",
              width: 300,
              height: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>????????? ??????????????????????</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderTopWidth: 1,
                borderTopColor: styles.darkGreyColor,
              }}
            >
              <TouchableOpacity
                onPress={() => setCommentDeleteVisible(!commentDeleteVisible)}
                disabled={isLoading}
              >
                <View
                  style={{
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                    height: 50,
                    borderRightColor: styles.darkGreyColor,
                  }}
                >
                  <Text>?????????</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isLoading}
                onPress={() => commentDeleteHandle()}
              >
                <View
                  style={{
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isLoading ? <Loader /> : <Text>???</Text>}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TalkCommentContainer;
