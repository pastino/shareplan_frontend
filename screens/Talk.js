import React, { useState, useEffect } from "react";
import ExpoIcon from "../components/ExpoIcon";
import {
  TouchableOpacity,
  View,
  Text,
  RefreshControl,
  ActivityIndicator,
  FlatList,
} from "react-native";
import styles from "../styles";
import { ScrollView } from "react-native-gesture-handler";
import contents from "../contents";
import TalkCreate from "./Talk/TalkCreate";
import { useQuery } from "react-apollo-hooks";
import { SEE_TALK } from "./Talk/talkQueries";
import TalkContainer from "./Talk/talkContainer/TalkContainer";
import Loader from "../components/Loader";
import { SEE_ME } from "./home/HomeQueries";
import { DrawerActions } from "react-navigation-drawer";
import ClockContainer from "./home/clock/ClockContainer";

const Talk = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [talkRefreshing, setTalkRefreshing] = useState(false);
  const [refreshFake, setRefreshFake] = useState(false);
  const [noMoreFetch, setNoMoreFetch] = useState(false);

  const date = new Date();
  const hour = date.getHours();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const [talkCreateVisible, setTalkCreateVisible] = useState(false);
  const talkCreteButton = () => {
    setTalkCreateVisible(true);
  };

  const { data, loading, error, fetchMore } = useQuery(SEE_TALK, {
    fetchPolicy: "network-only",
    variables: {
      pageNumber: 0,
      items: 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { loading: seeMeData, data: seeMe, refetch } = useQuery(SEE_ME, {
    fetchPolicy: "network-only",
  });

  const wakeUpVerify =
    seeMe &&
    seeMe.me &&
    seeMe.me.clocks &&
    seeMe.me.clocks.filter(
      (obj) =>
        obj.todayYear === year &&
        obj.todayMonth === month &&
        obj.todayDate === day
    ) &&
    seeMe.me.clocks.filter(
      (obj) =>
        obj.todayYear === year &&
        obj.todayMonth === month &&
        obj.todayDate === day
    )[0] &&
    seeMe.me.clocks.filter(
      (obj) =>
        obj.todayYear === year &&
        obj.todayMonth === month &&
        obj.todayDate === day
    )[0].wakeUpTime;

  const talkData = data && data.seeTalk;

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ variables: { wakeUpVerify } });
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (refreshFake) {
      onRefresh();
    }
  }, [refreshFake]);

  const talkOnRefresh = async () => {
    try {
      setTalkRefreshing(true);
      await refetch({ variables: { talkData } });
    } catch (e) {
    } finally {
      setTalkRefreshing(false);
    }
  };

  return (
    <>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: styles.lightGreyColor,
          height: 80,
          width: contents.width,
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 10,
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            fontSize: 10,
            color: styles.Wine,
            fontWeight: "700",
            marginBottom: 10,
          }}
        >
          ??? ???????????? ??????(00???)??? ?????????, 4????????? ????????????.
        </Text>
        <Text style={{ fontSize: 10 }}>
          ????????? 4~8??? ??????????????? ?????? ????????? ?????? ???????????????.
        </Text>
        <Text style={{ fontSize: 10 }}>
          ??????, ??????, ???, ????????? ??????, ?????? ??? ???????????? ????????? ???????????????.
        </Text>
        {wakeUpVerify !== undefined ? (
          <View style={{ position: "absolute", right: 10, bottom: 10 }}>
            <TouchableOpacity onPress={() => talkCreteButton()}>
              <View
                style={{
                  width: 37,
                  height: 37,
                  backgroundColor: styles.MainColor,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ExpoIcon name={"plus"} color={"white"} />
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      {seeMeData ? (
        <Loader />
      ) : wakeUpVerify !== undefined ? (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <FlatList
            data={talkData}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={1}
            renderItem={({ item }) => (
              <TalkContainer {...item} seeMe={seeMe} navigation={navigation} />
            )}
            refreshing={talkRefreshing}
            onRefresh={() => talkOnRefresh()}
            onEndReached={() => {
              noMoreFetch === true
                ? null
                : loading
                ? null
                : fetchMore({
                    variables: {
                      pageNumber: data && data.seeTalk && data.seeTalk.length,
                      items: 10,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (fetchMoreResult.seeTalk.length === 0) {
                        setNoMoreFetch(true);
                      }
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        seeTalk: [...prev.seeTalk, ...fetchMoreResult.seeTalk],
                      });
                    },
                  });
            }}
            ListFooterComponent={() =>
              noMoreFetch ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "700",
                      color: styles.darkGreyColor,
                    }}
                  >
                    ????????? ????????? ?????? ????????????.
                  </Text>
                </View>
              ) : loading ? (
                <View
                  style={{
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator />
                </View>
              ) : null
            }
          />

          {/* </ScrollView> */}
          <TalkCreate
            talkCreateVisible={talkCreateVisible}
            setTalkCreateVisible={setTalkCreateVisible}
          />
        </View>
      ) : (
        <ScrollView
          style={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
        >
          <View
            style={{
              flex: 1,
              height: contents.height - 140,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Text>???????????????.</Text>
            <Text>?????? ?????? ??????????????? ????????? ?????????????????? </Text>
            <Text>????????? ???????????????. </Text>
            {hour >= 20 && hour <= 21 ? (
              <View
                style={{
                  marginTop: 10,
                  color: styles.Wine,
                  fontWeight: "700",
                }}
              >
                <Text style={{ color: styles.Wine, fontWeight: "700" }}>
                  ????????? ????????? ???????????? ??????????????? ????????????.
                </Text>
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    marginTop: 10,
                    color: styles.Wine,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  ????????? 4~8?????? ????????????,
                </Text>
                <Text
                  style={{
                    color: styles.Wine,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  ?????? ????????? ???????????? ??????????????????.
                </Text>
              </View>
            )}
            <View style={{ marginTop: 20 }}>
              <ClockContainer
                onRefresh={onRefresh}
                setRefreshFake={setRefreshFake}
              />
            </View>
            <View style={{ marginTop: 30, flexDirection: "row" }}>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 10,
                    fontWeight: "700",
                  }}
                >
                  ???????????? ????????? ????????? ????????? ????????????
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 10,
                    fontWeight: "700",
                  }}
                >
                  ????????? ??????????????? ???????????? ??????????????????.
                </Text>
              </View>
              <View style={{ marginLeft: 17 }}>
                <ExpoIcon name={"gesture-swipe-down"} />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Talk;
