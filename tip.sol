pragma solidity ^0.5.0;

contract tipoff 
{
    struct tip
    {
        address tipAddress;
        string category;
        string brief;
        string time;
        string location;
        string station;
        uint256 tip_score;
    }

    tip[] tips;

    function addTips(address _tipAdd, string memory _category, string memory _brief, string memory _time, string memory _location, string memory _station, uint256 _tipscore) public{
        tip memory newTip = tip({tipAddress: _tipAdd, category: _category, brief: _brief, time: _time, location: _location, station:_station, tip_score:_tipscore});
        tips.push(newTip);
    }

    function getTipsInfo(address _id) public view returns(string memory, string memory, string memory, string memory, string memory, uint256) {
        for(uint i=0;i<tips.length;i++){
            if(tips[i].tipAddress==_id){
                return (tips[i].category, tips[i].brief, tips[i].time, tips[i].location, tips[i].station, tips[i].tip_score);
            }
        }
        return ("", "", "", "", "", uint256(0));
    }
}